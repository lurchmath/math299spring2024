
import { FileSystem } from './file-system.js'
import { WebFileSystem } from './web-file-system.js'

// Internal use only
// Trace a path through the myCourse object from appOptions
const followPath = ( path, node ) => {
    path = path.filter( step => step != '' )
    // handle special case of root, which is just an array, vs. inner folders,
    // which have a contents member:
    if ( node.contents ) node = node.contents
    // base case: we have followed the path to where it led, great
    if ( path.length == 0 ) return node
    // error case #1: path tries to navigate inside a file
    if ( !( node instanceof Array ) ) return undefined
    // error case #2: path tries to navigate to a folder that doesn't exist
    const name = path.shift()
    const item = node.find( item => item.name == name )
    if ( !item ) return undefined
    // recursive case: follow the path
    return followPath( path, item )
}

/**
 * A subclass of {@link FileSystem} that represents the set of files that the
 * instructor who has configured this instance of the Lurch app specified in the
 * application configuration.  To see how to specify the application
 * configuration in general, view the documentation for the
 * {@link Lurch.createApp createApp()} function.  To see how to format the
 * `"myCourse"` field of that options object to specify the contents of this
 * file system, read on here.
 * 
 * We want to make it easy for an instructor to provide their students with a
 * (hierarchical) list of files for their course.  The instructor can put any
 * number of files into the same website or folder from which they are hosting
 * the Lurch application, but rather than expect the students to search out the
 * correct folder using the {@link WebFileSystem}, this class makes it easy for
 * the instructor to specify which files matter to the students and the course,
 * and make them easy to find.  It also lets the instructor give each one a
 * title, rather than referring to it only by its (possibly opaque) URL.
 * 
 * An instructor specifies the files in the `"myCourse"` field of the app's
 * options object in the following format.
 * 
 * ```js
 * "myCourse" : [
 *     // an array of files or folders
 *     // a folder has this format:
 *     {                     
 *         "name" : "Week 1: Introduction",
 *         "contents" : [
 *             // an array of files or folder
 *             // a file has this format:
 *             {
 *                 "name" : "Basic arithmetic",
 *                 "path" : "../math/week1/basic-arithmetic.lurch"
 *                 // paths are relative to the app/index.html file
 *             },
 *             // you could put more files or folders here
 *         ]
 *     },
 *     // you could put more files or folders here
 * ]
 * ```
 */
export class MyCourseFileSystem extends WebFileSystem {

    static subclassName = FileSystem.registerSubclass(
        'my course', MyCourseFileSystem )
    
    /**
     * Reads files using the {@link WebFileSystem#read read()} method of the
     * parent class, with one convention of note.  This class gives a file
     * object a filename that is separate from its UID.  The filename holds the
     * title of the file, and the UID holds the URL to the file.  Thus this
     * method, when it is called with a file object, will copy the UID over top
     * of the filename, because the parent class assumes the URL will be in the
     * filename field.
     */
    read ( fileObject ) {
        if ( !fileObject?.UID )
            return super.read( fileObject )
        fileObject.filename = fileObject.UID
        delete fileObject.UID
        delete fileObject.path
        return super.read( fileObject )
    }

    /**
     * See the documentation of the {@link FileSystem#has has()} method in the
     * parent class for the definition of how this method must behave.  It
     * implements the requirements specified there for the hierarchical list of
     * files defined in the `myCourse` field of the app options object, as
     * documented {@link MyCourseFileSystem at the top of this class}.
     * 
     * @param {Object} fileObject - as documented in the {@link FileSystem}
     *   class
     * @returns {Promise} as documented in {@link FileSystem#has the abstract
     *   method of the parent class}
     */
    has ( fileObject ) {
        if ( !fileObject )
            throw new Error( 'Missing required file object argument' )
        if ( fileObject.fileSystemName
          && fileObject.fileSystemName != this.getName() )
            throw new Error( `Wrong file system: ${fileObject.fileSystemName}` )
        const myCourseItem = followPath(
            fileObject.path.split( '/' ),
            this.editor.appOptions.myCourse || [ ] )
        return Promise.resolve( !!myCourseItem )
    }

    /**
     * See the documentation of the {@link FileSystem#list list()} method in the
     * parent class for the definition of how this method must behave.  It
     * implements the requirements specified there for the hierarchical list of
     * files defined in the `myCourse` field of the app options object, as
     * documented {@link MyCourseFileSystem at the top of this class}.
     * 
     * @param {Object} fileObject - as documented in the {@link FileSystem}
     *   class
     * @returns {Promise} as documented in {@link FileSystem#list the abstract
     *   method of the parent class}
     */
    list ( fileObject ) {
        // make sure the path points to a real folder in my course
        const myCourse = this.editor.appOptions.myCourse || [ ]
        const path = fileObject?.path || ''
        const folder = followPath( path.split( '/' ), myCourse )
        if ( !folder || !( folder instanceof Array ) )
            return Promise.reject( `Invalid path into My course: "${path}"` )
        // return all the items in that folder, obeying the conventions
        // mentioned in the documentation for the read() method, plus the
        // overarching convention of how to distinguish files from folders
        return Promise.resolve( folder.map( item => {
            // items that are (sub)folders have this format:
            const result = {
                fileSystemName: this.getName(),
                path : ( path ? path + '/' : '' ) + item.name
            }
            // items that are files also have a name and an URL:
            if ( item.path ) {
                result.filename = item.name // name
                result.UID = item.path // URL
            }
            return result
        } ) )
    }

    /**
     * Although we inherit the {@link WebFileSystem} class for its
     * {@link WebFileSystem#read read()} method, we do not want its fancy
     * {@link WebFileSystem#fileChooserItems fileChooserItems()} method, with
     * bookmarks, etc.  So this version overrides that to return to the method
     * of the grandparent class, {@link FileSystem}.
     */
    fileChooserItems ( fileObject ) {
        return FileSystem.prototype.fileChooserItems.apply( this, [ fileObject ] )
    }

}

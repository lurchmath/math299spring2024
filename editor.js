
/**
 * This file does the load and setup for the TinyMCE editor.  It ensures that
 * the editor fills the viewable area of the webpage.  It does this upon import,
 * by loading TinyMCE from its CDN into the page, adding an HTMLElement into
 * which to install TinyMCE, and then doing that installation.
 */

// The loadScript function lets us add a script tag to the page, then take some
// action once that script tag has finished loading its script
import { loadScript } from './utilities.js'

// TinyMCE's CDN URL, from which we will load it
const TinyMCEURL = 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.6.0/tinymce.min.js'

// Add a textarea input element to the page, into which we will install TinyMCE
const textarea = document.createElement( 'textarea' )
textarea.setAttribute( 'id', 'editor' )
document.body.appendChild( textarea )

// Load TinyMCE from its CDN
loadScript( TinyMCEURL ).then( () => {
    // Set up the editor in the textarea we created above
    tinymce.init( {
        selector : '#editor',
        promotion : false, // disable premium features advertisement
        toolbar : 'undo redo | styles bold italic | alignleft aligncenter alignright outdent indent',
        plugins : 'fullscreen', // enable full screen mode
        statusbar : false,
        setup : editor => {
            // Activate full screen mode as soon as the editor is ready
            editor.on( 'init', () => editor.execCommand( 'mceFullScreen' ) )
        }
    } )
} )

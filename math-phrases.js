
/**
 * This file installs one tool into the user interface, a menu item for
 * inserting a math phrase definition into the document.  A user who edits such
 * a thing (which is a block-style atom) can specify all of the following
 * attributes:
 * 
 *  * Name of the phrase
 *  * Names of its parameters
 *  * HTML representation in terms of those parameters
 *  * Representation in some other notation, also in terms of those parameters
 *  * Name of the notation in question (putdown, etc.)
 * 
 * @module MathPhrases
 */

import { Atom } from './atoms.js'
import { Shell } from './shells.js'
import { simpleHTMLTable, escapeHTML, editorForNode } from './utilities.js'
import { Dialog, TextInputItem, SelectBoxItem } from './dialog.js'
import { phraseHTML } from './expressions.js'
import { addAutocompleteFunction } from './auto-completer.js'
import { names as notationNames } from './notation.js'

const validParamNames = text => {
    if ( /^\s*$/.test( text ) ) return true
    const paramNames = text.split( /\s*,\s*/ )
    return paramNames.every( name => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test( name ) )
}
const validNotation = notation => notationNames().includes( notation.toLowerCase() )

/**
 * Find all math phrases accessible to a given element in its editor.
 * 
 * @param {Atom|Node} target - the location whose accessibles should be found;
 *   this can be an Atom instance of a DOM Node
 */
export const phrasesInForceAt = target => {
    const result = [ ]
    const editor = target instanceof Atom ? target.editor : editorForNode( target )
    if ( !editor ) return [ ]
    const element = target instanceof Atom ?
        ( target.element || target.futureLocation ) : target
    Shell.accessibles( editor, element ).forEach(
        atomElement => {
            const atom = new Atom( atomElement, editor )
            if ( atom.getMetadata( 'type' ) == 'mathphrasedef' )
                result.push( atom )
        }
    )
    return result
}

/**
 * Install into a TinyMCE editor instance a new menu item: Define math phrase,
 * intended for the Document menu.  It adds a math phrase definition atom (with
 * no content) to the user's document, and if the user clicks it, they can then
 * specify its properties in a popup dialog.
 * 
 * This assumes that the TinyMCE initialization code includes the
 * "mathphrasedef" item on one of the menus.
 * 
 * This function also installs into the TinyMCE editor an autocomplete handler,
 * so that if the user types an opening backslash, it will give them the
 * opportunity to insert a math phrase definition, from the list of any phrases
 * defined at that point in the document.  The autocomplete function is
 * installed using the {@link module:AutoComplete AutoComplete module}.
 * 
 * @param {tinymce.Editor} editor the TinyMCE editor instance into which the new
 *   menu item should be installed
 * @function
 */
export const install = editor => {
    editor.ui.registry.addMenuItem( 'mathphrasedef', {
        text : 'Define math phrase',
        tooltip : 'Insert block for defining a math phrase',
        onAction : () => {
            const atom = Atom.newBlock( editor, '', {
                type : 'mathphrasedef',
                name : 'equation',
                paramNames : 'X, Y',
                codeTemplate : 'X = Y',
                notation : 'math editor'
            } )
            atom.setHTMLMetadata( 'htmlTemplate', 'X and Y are equal' )
            atom.update()
            atom.editThenInsert()
        }
    } )
    addAutocompleteFunction( editor => 
        phrasesInForceAt( editor.selection.getNode() )
        .map( phrase => {
            const name = phrase.getMetadata( 'name' )
            const html = phrase.getHTMLMetadata( 'htmlTemplate' ).innerHTML
            return {
                shortcut : name,
                preview : html,
                content : phraseHTML( phrase, editor )
            }
        } )
    )
}

// Internal use only: Show the dialog whose behavior is described above.
Atom.addType( 'mathphrasedef', {
    edit : function () {
        const dialog = new Dialog( 'Edit math phrase definition', this.editor )
        dialog.addItem( new TextInputItem( 'name', 'Name' ) )
        dialog.setDefaultFocus( 'name' )
        dialog.addItem( new TextInputItem( 'paramNames', 'Parameters' ) )
        dialog.addItem( new TextInputItem( 'htmlTemplate', 'External representation (in HTML)' ) )
        dialog.addItem( new SelectBoxItem( 'notation', 'Notation for internal representation', notationNames() ) )
        dialog.addItem( new TextInputItem( 'codeTemplate', 'Internal representation' ) )
        dialog.setInitialData( {
            name : this.getMetadata( 'name' ),
            paramNames : this.getMetadata( 'paramNames' ),
            htmlTemplate : this.getHTMLMetadata( 'htmlTemplate' ).innerHTML,
            codeTemplate : this.getMetadata( 'codeTemplate' ),
            notation : this.getMetadata( 'notation' )
        } )
        return dialog.show().then( userHitOK => {
            if ( !userHitOK ) return false
            this.setMetadata( 'name', dialog.get( 'name' ) )
            this.setMetadata( 'paramNames', dialog.get( 'paramNames' ) )
            this.setHTMLMetadata( 'htmlTemplate', dialog.get( 'htmlTemplate' ) )
            this.setMetadata( 'codeTemplate', dialog.get( 'codeTemplate' ) )
            this.setMetadata( 'notation', dialog.get( 'notation' ) )
            this.update()
            return true
        } )
    },
    update : function () {
        this.element.style.border = 'solid 1px blue'
        this.element.style.padding = '1em'
        const name = this.getMetadata( 'name' )
        const paramNames = this.getMetadata( 'paramNames' )
        const htmlTemplate = this.getHTMLMetadata( 'htmlTemplate' ).innerHTML
        const codeTemplate = this.getMetadata( 'codeTemplate' )
        const notation = this.getMetadata( 'notation' )
        this.fillChild( 'body', simpleHTMLTable(
            'Define a new math phrase with the following properties.',
            [
                'Name:', escapeHTML( name ),
                name == '' && `Math phrase must have a name`
            ],
            [
                'Parameters:', escapeHTML( paramNames ),
                !validParamNames( paramNames ) && `Not a valid list of parameters`
            ],
            [
                'External representation (in HTML):', `<tt>${escapeHTML( htmlTemplate )}</tt>`,
                htmlTemplate == '' && `Math phrase must have an HTML representation`
            ],
            [
                'Internal representation notation:', `<tt>${escapeHTML( notation )}</tt>`,
                !validNotation( notation ) && `Not a valid notation`
            ],
            [
                'Internal representation:', `<tt>${escapeHTML( codeTemplate )}</tt>`,
                codeTemplate == '' && `Math phrase must have a code representation`
            ]
        ) )
    }
} )

export default { install }

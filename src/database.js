

/////////////////////////////////////////////////
// DO NOT EDIT THIS SOURCE CODE FILE DIRECTLY. //
// IT IS AUTOGENERATED BY npm run build-db.    //
/////////////////////////////////////////////////

// Instead, edit database/footer.js, database/generate.js, or any of the
// .putdown files recursively stored in any subfolder of the database folder.

// This file begins with the database as a large JSON object,
// then ends with JavaScript code that provides access to it.

const putdownDatabase = [
  {
    "filename": "/parsing tests/syntax error 1.putdown",
    "metadata": {
      "testing": {
        "syntax": "invalid"
      }
    },
    "content": "\n// This file contains an Expression with an Environment inside, which is\n// invalid putdown syntax.\n\n(+ 1 2 { :A B })\n"
  },
  {
    "filename": "/parsing tests/syntax error 2.putdown",
    "metadata": {
      "testing": {
        "syntax": "invalid"
      }
    },
    "content": "\n// This file contains several different variable and constant declarations,\n// but one of them has an invalid structure that is a putdown syntax error.\n\n[x y z var] // valid\n[A B C const] // valid\n[x y z var (P x y z)] // valid\n[A B C const { (Q A) (R B) (S T) }] // valid\n[x y z var [A B C const]] // invalid\n"
  },
  {
    "filename": "/parsing tests/valid syntax 1.putdown",
    "metadata": {
      "testing": {
        "syntax": "valid",
        "length": 4
      }
    },
    "content": "\n// This file contains several Expressions, all using valid putdown notation.\n\n(+ 1 2)\n\n(- k t (* u v))\n\n(polynomial (variable x) (coefficients 9 0 -6 2 1))\n\n(forall x , (exists y , (> x y)))\n"
  },
  {
    "filename": "/parsing tests/valid syntax 2.putdown",
    "metadata": {
      "testing": {
        "syntax": "valid",
        "length": 1
      }
    },
    "content": "\n// This file contains some nested Environments, Expressions, and Declarations,\n// all using valid putdown syntax.\n\n{\n    // Let x be arbitrary.\n    :[x var]\n    // Assume x is a real number.\n    :(in x R)\n    // Claim that x is a complex number, by Theorem 21\n    (in x C) +{\"reason\":\"Theorem 21\"}\n}\n"
  },
  {
    "filename": "/propositional logic/all rules.putdown",
    "metadata": {
      "includes": [
        "declare connectives.putdown",
        "conjunction introduction.putdown",
        "conjunction elimination.putdown",
        "disjunction introduction.putdown",
        "disjunction elimination.putdown",
        "conditional introduction.putdown",
        "conditional elimination.putdown",
        "negation introduction.putdown",
        "negation elimination.putdown",
        "biconditional introduction.putdown",
        "biconditional elimination.putdown"
      ]
    },
    "content": "\n// Declare the logical connectives as constants:\n\n:[and or not implies iff const]\n\n\n{*\n    :A\n    :B\n    (and A B)\n*}\n\n\n{*\n    :(and A B)\n    A\n    B\n*}\n\n\n{*\n    :A\n    (or A B)\n*}\n\n{*\n    :B\n    (or A B)\n*}\n\n\n{*\n    :(or A B)\n    :(implies A C)\n    :(implies B C)\n    C\n*}\n\n\n{*\n    :{\n        :A\n        B\n    }\n    (implies A B)\n*}\n\n\n{*\n    :(implies A B)\n    :A\n    B\n*}\n\n\n{*\n    :{\n        :A\n        B\n        (not B)\n    }\n    (not A)\n*}\n\n\n{*\n    :{\n        :(not A)\n        B\n        (not B)\n    }\n    A\n*}\n\n\n{*\n    :{\n        :A\n        B\n    }\n    :{\n        :B\n        A\n    }\n    (iff A B)\n*}\n\n\n{*\n    :(iff A B)\n    :A\n    B\n*}\n\n{*\n    :(iff A B)\n    :B\n    A\n*}\n\n",
    "original": ""
  },
  {
    "filename": "/propositional logic/biconditional elimination.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "biconditional elimination",
        "<->E"
      ]
    },
    "content": "\n{*\n    :(iff A B)\n    :A\n    B\n*}\n\n{*\n    :(iff A B)\n    :B\n    A\n*}\n"
  },
  {
    "filename": "/propositional logic/biconditional introduction.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "conditional introduction",
        "->I"
      ]
    },
    "content": "\n{*\n    :{\n        :A\n        B\n    }\n    :{\n        :B\n        A\n    }\n    (iff A B)\n*}\n"
  },
  {
    "filename": "/propositional logic/conditional elimination.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "conditional elimination",
        "->E"
      ]
    },
    "content": "\n{*\n    :(implies A B)\n    :A\n    B\n*}\n"
  },
  {
    "filename": "/propositional logic/conditional introduction.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "conditional introduction",
        "->I"
      ]
    },
    "content": "\n{*\n    :{\n        :A\n        B\n    }\n    (implies A B)\n*}\n"
  },
  {
    "filename": "/propositional logic/conjunction elimination.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "conjunction elimination",
        "^E"
      ]
    },
    "content": "\n{*\n    :(and A B)\n    A\n    B\n*}\n"
  },
  {
    "filename": "/propositional logic/conjunction introduction.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "conjunction introduction",
        "^I"
      ]
    },
    "content": "\n{*\n    :A\n    :B\n    (and A B)\n*}\n"
  },
  {
    "filename": "/propositional logic/declare connectives.putdown",
    "metadata": {},
    "content": "\n// Declare the logical connectives as constants:\n\n:[and or not implies iff const]\n"
  },
  {
    "filename": "/propositional logic/disjunction elimination.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "disjunction elimination",
        "vE"
      ]
    },
    "content": "\n{*\n    :(or A B)\n    :(implies A C)\n    :(implies B C)\n    C\n*}\n"
  },
  {
    "filename": "/propositional logic/disjunction introduction.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "disjunction introduction",
        "vI"
      ]
    },
    "content": "\n{*\n    :A\n    (or A B)\n*}\n\n{*\n    :B\n    (or A B)\n*}\n"
  },
  {
    "filename": "/propositional logic/negation elimination.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "negation elimination",
        "-E"
      ]
    },
    "content": "\n{*\n    :{\n        :(not A)\n        B\n        (not B)\n    }\n    A\n*}\n"
  },
  {
    "filename": "/propositional logic/negation introduction.putdown",
    "metadata": {
      "rule": true,
      "names": [
        "negation introduction",
        "-I"
      ]
    },
    "content": "\n{*\n    :{\n        :A\n        B\n        (not B)\n    }\n    (not A)\n*}\n"
  }
]


/**
 * This file is a footer that will be embedded within /src/database.js when
 * that file is regenerated using the "npm run build-db" command, as
 * documented in /src/database/generate.js.
 */

// The features added by this file are various querying conveniences for the
// database, which include conversion of putdown notation to LogicConcept
// instances.  For that, we need the LogicConcept class.
import { LogicConcept } from './logic-concept.js'

// For the rest of the file, we assume the client has imported it with the
// following syntax:  import Database from './database.js'
// Call Database.keys() to get an array of all paths to all putdown files in
// the database, each path as a JavaScript string, such as:
// [ '/foo/bar/baz.putdown', '/bash/quux.putdown' ]
// If the database is like a filesystem, this is like ls -R.
export const keys = () =>
    putdownDatabase.map( entry => entry.filename )

// Exactly those keys from keys() that begin with the given string prefix.
// This can be useful for getting all keys recursively inside a certain
// "folder," e.g. keysStartingWith( '/foo/bar/' ).
export const keysStartingWith = prefix =>
    keys().filter( key => key.startsWith( prefix ) )

// The contents of a given "folder" of keys, as if it were actually a
// filesystem.  For instance, if we have keys
// [ '/one/two/a.putdown', '/one/two/b.putdown', '/one/c.putdown' ] then:
// keysPaths() => [ '/one' ]
// keysPaths( '/one' ) => [ 'two', 'c.putdown' ]
// keysPaths( '/one/two' ) => [ 'a.putdown', 'b.putdown' ]
// If the database is like a filesystem, this is like ls.
export const keysPaths = ( prefix = '' ) => {
    if ( !prefix.endsWith( '/' ) ) prefix += '/'
    return Array.from( new Set( keysStartingWith( prefix ).map(
        key => key.substring( prefix.length ).split( '/' )[0] ) ) )
}

// Get the list of all keys whose metadata satisfies a given predicate.
export const filterByMetadata = predicate =>
    putdownDatabase.filter( entry => predicate( entry.metadata ) )
    .map( entry => entry.filename )

// Read attributes from database entries; internal module helper function.
const getEntryAttribute = ( entryName, attribute ) => {
    const entry = putdownDatabase.find( entry => entry.filename == entryName )
    return entry ? entry[attribute] : undefined
}

// Set attributes on database entries; internal module helper function.
const setEntryAttribute = ( entryName, attribute, value ) => {
    const entry = putdownDatabase.find( entry => entry.filename == entryName )
    if ( entry ) entry[attribute] = value
    return value
}

// Get the metadata JSON object for any entry in the database.
// The parameter must be the full key for the entry, ending in '.putdown'.
// Returns the actual object, not a copy.
export const getMetadata = entryName =>
    getEntryAttribute( entryName, 'metadata' )

// Get the putdown source string for any entry in the database.
// This will include any files that were prefixed onto this one using the
// "includes" feature in the file's YAML header.
// (For that, see getPutdownWithoutIncludes().)
// It will not include that YAML header, which has been converted to JSON and
// is available via getMetadata().
export const getPutdown = entryName =>
    getEntryAttribute( entryName, 'content' )

// Get the putdown source string for any entry in the database.
// This will not include any files that were prefixed onto this one using the
// "includes" feature in the file's YAML header.
// (For that, see getPutdown().)
// It will not include that YAML header, which has been converted to JSON and
// is available via getMetadata().
export const getPutdownWithoutIncludes = entryName => {
    const original = getEntryAttribute( entryName, 'original' )
    return typeof( original ) == 'undefined' ?
        getEntryAttribute( entryName, 'content' ) : original
}

// Get a cached parsed result of the given entry's full putdown source, if any
// exists yet in the database.
const getParsedResult = entryName =>
    getEntryAttribute( entryName, 'parsed' )

// Store in the cache the parsed result of the given entry's putdown source,
// overwriting any previous cache value if there was one.
const setParsedResult = ( entryName, result ) =>
    setEntryAttribute( entryName, 'parsed', result )

// Get the JavaScript array of LogicConcepts parsed from the given database
// entry's putdown source, or throw an error if attempting to parse that
// putdown source threw an error.  The results (of either the parsing or the
// error) will be cached so that future calls return the exact same results.
export const getLogicConcepts = entryName => {
    const cached = getParsedResult( entryName )
    // if we cached a list of LCs, return them
    if ( cached instanceof Array ) return cached
    // if we cached something else, it was an error object; re-throw it
    if ( cached ) throw cached
    // we have no cache, so we must parse; get the putdown code
    const putdownCode = getPutdown( entryName )
    // if we have no code, we cannot proceed
    if ( !putdownCode ) return undefined
    try {
        // if we parse without error, cache the result and then return it
        return setParsedResult( entryName,
            LogicConcept.fromPutdown( putdownCode ) )
    } catch ( error ) {
        // otherwise, cache the error and also throw it
        throw setParsedResult( entryName, error )
    }
}

// If getLogicConcepts() applied to the same key would return an array of
// length 1, then return its sole entry.
// If instead it returns an array of length 0 or >1, throw an error.
// If instead it throws an error, just throw the same error.
export const getLogicConcept = entryName => {
    const all = getLogicConcepts( entryName )
    if ( all.length != 1 )
        throw `Expected 1 LogicConcept, got ${all.length}`
    return all[0]
}

// create a default object so that clients can do:
// import Database from './database.js'
export default {
    keys, keysStartingWith, keysPaths, filterByMetadata,
    getMetadata, getPutdown, getPutdownWithoutIncludes,
    getLogicConcepts, getLogicConcept
}


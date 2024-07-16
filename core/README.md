
# The Lurch Deductive Engine (LDE)

This repository is in the process of being rebuilt under a new design.
That rebuilding is about 50% complete.  Check back later, or just pardon the dust.

## Getting started with development

Choose one of the following 3 methods:

### Option 1 - Use your own machine and Node.js installation

 * This assumes you have already installed [Node.js](https://nodejs.org/en/).
   In order to run command-line scripts that import the modules defined in
   this repository, you will need at least version 16 of Node.js.
 * Clone this repository using the green "Code" button above.  (You can use
   the git command-line app with the URL in the Code button, or just click
   Code > Open with GitHub Desktop, if you have that app.)
 * Run `npm install` in your local copy of the repo, which you just cloned.
 * Edit files using whatever IDE you like.
 * The first time you [run tests](#running-the-tests), it may take some time
   to download a copy of the Chromium headless browser for internal use by
   the [puppeteer](https://pptr.dev/) tool that's used by our tests.

### Option 2 - Use VS Code and this repository's dev container setup

 * This assumes that you have already installed the following 3 things.
    * [VS Code](https://code.visualstudio.com/)
    * VS Code's [Remote Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
    * [Docker](https://www.docker.com/), which you have set to run in the
      background, so it's available when VS Code needs it
 * Clone this repository using the green "Code" button above.  (You can use
   the git command-line app with the URL in the Code button, or just click
   Code > Open with GitHub Desktop, if you have that app.)
 * Open that folder in VS Code, and it should ask if you want to launch the
   development containier defined therein (which includes appropriate
   versions of Node, Chromium, and more).  Say yes.
    * If it doesn't ask, you can always use the tiny green menu in the very
      bottom left of the VS Code window, which has a `><` icon, and choose
      the "Reopen in Container" option.

### Option 3 - Use [GitHub Codespaces](https://github.com/features/codespaces):

 * From the green "Code" button above, choose "Open with Codespaces."
 * Choose a new codespace if it's your first
   time doing so, or an existing one if you've done this before.
 * The Codespace will contain the same configuration as it would if you had
   used option 2., above, for developing in a container in VS Code locally.

## Running the tests

Tests run only in a browser, but you can launch them from the command line in
two ways:

 * To run a local web server and open the test suite in your default browser:
   `npm run test-server`
 * To run the tests in a headless Chromium and report the results in the
   terminal, imitating mocha output: `npm test`

## Building the documentation

 * To run JSDoc to build the source code documentation, use `npm run docs`.
 * To view the resulting documentation, use `npm run show-docs`.

## License

[![LGPLv3](https://www.gnu.org/graphics/lgplv3-147x51.png)](https://www.gnu.org/licenses/lgpl-3.0.en.html)


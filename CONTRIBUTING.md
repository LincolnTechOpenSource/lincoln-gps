
[//]: # (CONTRIBUTING.md)

# Contributing

We love pull requests from everyone. By participating in this project, you
agree to abide by TODO Group and GitHub's [code of conduct].

[code of conduct]: http://todogroup.org/opencodeofconduct/

We follow Vincent Driessen's [branching model](http://nvie.com/posts/a-successful-git-branching-model/).

Fork, then clone the repo:

    git clone git@github.com:your-username/lincoln-gps.git

Set up your machine:

   1. Installing Ionic, Cordova CLI, and Gulp
      * This doc assumes gulp is installed globally
      * `npm install -g ionic cordova gulp`
   2. Installing Packages
      * `npm install`
   3. Building with Gulp
      * Run `gulp` to start the development build process
         * Compiling, concatenating, auto-prefixing `.scss` files required by [src/client/content/styles/main.scss](src/client/content/styles/main.scss)
         * Creating `vendor.js` from front-end `npm modules` and `plugins`
         * Linting all `*.js` files, analyzing the source files with `plato`
         * Injecting sources into `index.html`
         * Building everything into `.dev`
         * Starting the local server to serve from `.dev`
         * Starting watchers to automatically rebuild upon saved changes
      * The `--noAnalyze` flag (`--na`) is the same as above, but does not analyze (making recompile faster)
      * The `--build` flag (`-b`) starts the non-development build process
         * In addition to the above: Concats all `*.js` sources into a single `app.js` file
         * Versions `main.css` and `app.js`
         * Builds everything into `www`
      * The `--release` flag removes debug messages (e.g. `console.log`)
      * [gulp.config.json](gulp.config.json) defines the necessary paths in [gulpfile.js](gulpfile.js)


Make your change. Test your change. Make sure everything is working as intended.

Push to your fork and [submit a pull request][pr].

[pr]: https://github.com/LincolnTechOpenSource/lincoln-gps/compare

Now you are waiting on us to review your changes. After looking through and testing
your updates, we may suggest some changes, improvements, or alternatives.

Some things that will increase the chance that your pull request is accepted:

* Write tests.
* Follow [John Papa's Angular Style Guide][style].
* Write a [good commit message][commit].

[style]: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md
[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

## Notes

* To update the underlying graph, please see [angular graph dijkstra](https://github.com/LincolnTechOpenSource/angular-graph-dijkstra)
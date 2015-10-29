## Getting Started

Assumptions:

* npm and node.js are installed
* python 2.7 and pip are installed

Install libraries:

    npm install -g gulp-cli karma-cli mocha
    pip install -r server/requirements.txt
    npm install

Run the Python API server in its own terminal:

    ./dev_server

Run the Gulp build process (which will also start the webpack dev proxy server):

    gulp dev

Browse to: [http://localhost:3000](http://localhost:3000)

## Testing

You can test standalone with `npm run test` or `npm run test:watch`. The latter is for monitoring changes to files and automatically re-running tests.

If you want to run the tests in Karma, you can run `karma start`.

## Libraries Used

* React (Views)
  * [Presentation](https://www.youtube.com/watch?v=XxVg_s8xAms)
  * [React Native](https://www.youtube.com/watch?v=KVZ-P-ZI6W4)
  * [Documentation](https://facebook.github.io/react/docs/getting-started.html)
* React-Bootstrap (UI Components)
  * [Documentation](https://react-bootstrap.github.io/components.html)
* Redux (State management)
  * [Presentation](https://www.youtube.com/watch?v=xsSnOQynTHs)
  * [Documentation](http://redux.js.org/)
* Webpack (Module builder)
  * [Presentation](https://www.youtube.com/watch?v=TaWKUpahFZM)
  * [Documentation](https://webpack.github.io/docs/)
* Babel (ES6 transpiler)
  * [Presentation](https://www.youtube.com/watch?v=CozSF5abcTA)
  * [Documentation](https://babeljs.io/)
* Gulp (Builds)
  * [Documentation](https://github.com/gulpjs/gulp/tree/master/docs)

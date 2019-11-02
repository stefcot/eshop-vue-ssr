// Reify allow us to load files that use 'import/export' syntax
// inside the node js environment
require('reify');

const express = require('express');
const { default: langs } = require('./i18n');

// To render our app, we will need a renderer created with the createBundleRenderer
// function from the vue-server-renderer package.

// A bundle renderer is quite different from a normal renderer. It uses a
// server bundle file (that will be generated, thanks to our new webpack
// configuration) with an optional client manifest that allows the renderer to
// have more information about the code. This enables more features such as
// source maps and hot-reloading.
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);
const templatePath = resolve('./index.template.html');

// Create Express server app
const server = express();

// Vue bundle renderer
// eslint-disable-next-line no-unused-vars
let renderer;

// In development: wait for webpack compilation
// when receiving a SSR request
let readyPromise;

if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template,
    clientManifest
  });
} else {
  const setupDevServer = require('./server.dev');
  // Thanks to the server.dev.js file, we can add support of webpack hot-reloading to our
  // express server. We also specify the path to the HTML page template, so we can reload it too
  // when changed.
  readyPromise = setupDevServer({
    server,
    templatePath,
    onUpdate(bundle, options) {
      // When the setup triggers an update, we create or recreate the bundle renderer.
      renderer = createBundleRenderer(bundle, {
        // If set to true, can cause performances problems
        runInNewContext: false,
        ...options
      });
    }
  });
}

// Serve static files
const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });

// Serve dist files
server.use('/dist', serve('./dist', true));

// We implement the code that renders the app and send the HTML result
// back to the client. Render the Vue app using the bundle renderer
function renderApp(req, res) {
  const context = {
    url: req.url,
    // languages sent by the server
    // Thanks to the req.acceptsLanguages method from express, we can easily select the
    // preferred language of the user.
    locale: req.acceptsLanguages(langs) || 'en'
  };
  // We then use the renderToString method that will call the function we exported in the
  // entry-server.js file, wait for the returned Promise to complete and then render the app
  // into an HTML string. Finally, we send the result to the client (unless there is an error during
  // the render).
  renderer.renderToString(context, (err, html) => {
    if (err) {
      // render error page or redirect
      res.status(500).send('500 | Internal server error');
      console.log(`Error during render : ${req.url}`);
      console.log(err.stack);
    }
    res.send(html);
  });
}

// Process SSR requests
let ssr;

if (isProd) {
  ssr = renderApp;
} else {
  // In development: wait for webpack compilation
  // when receiving a SSR request
  ssr = (req, res) => {
    readyPromise.then(() => renderApp(req, res));
  };
}

server.get('*', ssr);

// Listening
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

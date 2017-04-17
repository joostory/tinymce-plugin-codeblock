# codeblock TinyMCE Plugin

Welcome stranger! This is a repo containing the codeblock TinyMCE plugin.

## The development server

By running the `npm start` command you start the development server and open a browser window with an instance of TinyMCE with your plugin added to it. This window will reload automatically whenever a change is detected in the `index.html` file in the `static` folder or in one of the JavaScript files in the `src` directory.

## The production build

By running the `npm run build` command Webpack will create a `dist` directory with a child directory with the name of your plugin (codeblock) containing four files:

* `plugin.js` - the bundled plugin
* `plugin.min.js` - the bundles, uglified and minified plugin
* `codeblock.css` - codeblock dialog style (copied over from `static/codeblock.css`)
* `LICENSE` - a file explaining the license of your plugin (copied over from `LICENSE`) 

## use

```
tinymce.init({
  plugins: 'codeblock code',
  toolbar: 'codeblock code',
  codeblock: {
    highlightStyle: "https://cdn.jsdelivr.net/highlight.js/9.10.0/styles/default.min.css", // highlight.js style
    codeTheme: 'default' // codemirror theme
  }
});
```

# Download Your Audible Library

<img width="300" alt="plugin preview" src="https://files.the-space.agency/.audible-backup-extension/popup-small.gif">

This plugin synchronizes your audible library with a backup server. It does
_not_ remove the DRM from your audiobooks. It simply downloads the AAX files
via the normal download link in the audible web library.

After installing the plugin you have to first configure your backup URL via the
plugins UI. To set the URL click the plugins icon in your address bar.

Currently this plugin is hardcoded to amazon.de

## Development

During development you can run the following to launch webpack in watch mode.
Webpack will watch the source files for changes an rebuild the plugin in
`dist/` on demand.

```sh
npm install
npm start
```

To create a production build in `dist/` run:
```sh
npm run-script build
```

You can load `dist/` as an unpacked extension or further package and sign the
extension via `crx` for chrome or via `web-ext` for firefox.

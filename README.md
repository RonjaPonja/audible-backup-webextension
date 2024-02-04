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

Then follow [these instructions on how to load an unpacked extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension#testing_it_out).

To create a production build in `dist/` run:
```sh
npm run-script build
```

## Firefox Package + Signing

First get a Mozilla account and note down the JWT issuer and secret from this side: https://addons.mozilla.org/en-US/developers/addon/api/key/

Then package and sign:
```
web-ext build --source-dir=./dist/ --verbose
web-ext sign --source-dir=./dist/ --id="{c64df573-2fdd-4f75-a38e-eed35bc1a08f}" --api-key=<jwt_issuer> --api-secret=<jwt_secret> 
```

The signed extension will be placed in ./web-ext-artifacts. If the plugin was previously published under the same ID, the new version will go into a quick automatic review, before hitting the mozilla addon store.

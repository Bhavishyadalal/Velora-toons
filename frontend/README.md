# Frontend

Serve this directory as a static website. No build or npm install is required. `index.html` imports browser ES modules; use an HTTP(S) server rather than file://.

Set public `apiBase` in config.js or use Your space. config.js must not contain API tokens or private credentials. Device settings override deployment defaults. For Vercel, choose this folder as Root Directory and framework Other; see [deployment instructions](../docs/DEPLOY_VERCEL.md).

Original visual system: dark ink surfaces, cosmic violet accent, CSS planet artwork, small SVG icons, poster-led catalogue, accessible dialogs, mobile bottom navigation, mint and rose alternatives. The artwork and icons are code-native and included. Real posters are requested from their original metadata URLs; none are bundled.

Browser-local favourites and recent titles do not sync across devices. Switching catalogue tabs preserves an active player region. Whole-page refresh discards the iframe and playback progress. Source/language switching may start the new provider player from its beginning.

There is no synthetic catalogue mode in the release. Without an API it displays a setup screen. Errors and unavailable downloads remain explicit.

# Velora Toons frontend

Mobile-first static HTML, CSS and JavaScript site. This repository contains `frontend/`; the FastAPI backend lives at https://github.com/Bhavishyadalal/Velora-toons-backend-.

## Local setup and checks

No build or npm install is required. From this repository root:

```sh
node scripts/check-frontend.mjs
node --test frontend/tests/*.test.mjs
python -m http.server 5173 --directory frontend
```

Use Node 20+ for checks. Open http://localhost:5173 and set http://localhost:10000 in **Your space** while running the backend separately. ES modules require HTTP(S).

## Vercel deployment

Import this repository, set Root Directory to `frontend`, framework to **Other**, leave install/build commands empty, and set Output Directory to `.` if requested. `frontend/vercel.json` supplies security headers.

Deploy the backend repository on Render, set its `ALLOWED_ORIGINS` to this site's exact origin, then put the Render HTTPS URL in `frontend/config.js` and redeploy. The API address is public configuration; never add tokens. Device settings override `config.js`.

See [Vercel setup](docs/DEPLOY_VERCEL.md), [architecture](docs/ARCHITECTURE.md), [security](docs/SECURITY.md), and [validation](docs/VALIDATION.md). Video playback goes directly from providers to the browser. Provider embeds are not direct download links.

Shared documentation and handoff notes came from the combined ZIP. Commands mentioning `backend/` must run in the backend repository. Fixture tests do not verify live source access or playback.

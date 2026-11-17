# Anggik Fantoca — Portfolio

Astro portfolio with a Persona-inspired menu, keyboard/gamepad navigation, and directly addressable project pages.

## Development

Requires Node.js 22.12 or later.

- Install dependencies: `npm install`
- Start in background: `npm exec -- astro dev --background`
- Inspect or stop: `npm exec -- astro dev status`, `npm exec -- astro dev logs`, `npm exec -- astro dev stop`
- Static checks: `node --test tests/content.test.mjs`
- Production build when needed: `npm run build`

## Content

- `src/scripts/model.js`: design archive and skill groups.
- `public/data/projects.json`: selected development projects.
- `public/readmes/`: case studies rendered and sanitized at build time.
- `src/pages/index.astro`: personal bio and contact links.
- `src/scripts/`: the only active client script source; Astro bundles these modules.
- `public/ASSET-CREDITS.md`: image provenance and visual reference.

## Languages

The language switcher uses English by default and remembers the visitor's choice. For a project in `public/data/projects.json`, keep the existing English fields and add optional Indonesian text under `i18n.id` (for example `title`, `badge`, and `desc`). Shared fields such as the image, slug, and technology tags only need to be entered once. Missing translations fall back to English. An optional `i18n.id.readme` can point to an Indonesian Markdown case study in `public/readmes/`; without it, the English case study is shown.

The public portfolio and GitHub account supplied by the owner were used to replace inherited template content. Private project summaries describe capabilities only; no credentials, internal hostnames, client records, or private source code are included.

Unverified template case studies, old public script copies, inherited CNAME, CV files, reference profile image and unused starter assets were moved to the ignored `scratch/template-archive/`. They are not served publicly and can be recovered from that directory. A CV-request email link is shown until an approved CV is supplied.

## Publishing

Set `PUBLIC_SITE_URL` to the actual deployment origin (for example your own HTTPS custom domain) before a production build. Canonical URLs, social image URLs, robots and sitemap use this value. No domain was guessed; the inherited mezdev.xyz configuration is archived.

The site produces static output in `dist/`. Deploy that directory to your chosen static host. No automatic publishing workflow is enabled.

## Contact

FormSubmit delivers contact messages to the existing business email. Its mailbox activation must be completed by the owner. The form validates fields, prevents concurrent submissions, times out after 15 seconds, and checks the relay's success response. On failure it retains the draft and offers the direct email link. Client validation is not server-side rate limiting; delivery and relay spam protection remain provider responsibilities.

## Sources

- Previous portfolio: https://fantoca.github.io/Fantoca-Portofolio.github.io/
- Public code: https://github.com/Fantocaa/goravel-inertia-react
- Visual inspiration: https://github.com/Omicron69/persona5-style-portfolio

The website keeps a small design archive alongside current development work. Any client impact numbers, employer details, educational credentials, and CV must be added only after verification.

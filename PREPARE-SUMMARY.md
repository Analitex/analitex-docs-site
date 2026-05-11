# analitex-docs-site Preparation Summary

## Completed Changes

### 1. README.md
- Updated with Analitex branding and project links.
- Documents the Docusaurus engine/content repository split.
- Includes local development, CI/CD, secrets, trigger workflow, and DNS notes.

### 2. docusaurus.config.ts
- Title: `Analitex`
- Production URL: `https://docs.analitex.ru`
- Organization: `analitex`
- Project: `analitex-docs-site`
- Default locale: `ru`
- Locales: `['ru', 'en']`
- Blog plugin disabled
- Navbar links documentation and `https://app.analitex.ru`
- Footer links documentation, `https://analitex.ru`, and `https://app.analitex.ru`
- Edit URL points to `analitex-docs`

### 3. GitHub Actions Workflow
- Builds on push to `production`
- Supports `repository_dispatch` with `docs-update`
- Clones external docs from `analitex-docs`
- Replaces `/docs` and optional `/i18n`
- Copies optional `registry/links.json`
- Builds with Node.js 20
- Deploys with GitHub Pages Actions

### 4. Dependabot Configuration
- Weekly npm dependency updates
- Limits simultaneous PRs to 5
- Uses `deps` commit prefix
- Adds an npm override for `serialize-javascript@7.0.5` to keep the installed tree audit-clean on Node.js 20

### 5. Setup Documentation
- GitHub Pages setup
- DNS checklist for `docs.analitex.ru`
- Secret management guide
- Development workflow commands

### 6. Local Placeholder Content
- Homepage copy adapted to Analitex.
- `docs/intro.mdx` adapted to Analitex.
- Project links include docs, main site, and app.
- Social preview asset replaced with Analitex-branded SVG.

## Next Steps

1. Create or confirm `analitex-docs` with this structure:

```text
analitex-docs/
├─ docs/
│  ├─ _category_.json
│  └─ intro.md
├─ i18n/
│  └─ en/
│     └─ docusaurus-plugin-content-docs/
│        └─ current/
│           └─ intro.md
├─ registry/
│  └─ links.json
└─ .github/workflows/
   └─ trigger.yml
```

2. Configure GitHub Pages:
- Source: `GitHub Actions`
- Custom domain: `docs.analitex.ru`
- Enforce HTTPS

3. Configure DNS:
- `docs` CNAME -> `analitex.github.io`

4. Add repository secrets if needed:
- `DOCS_REPO_TOKEN` in `analitex-docs-site` if `analitex-docs` is private
- `REPO_TOKEN` in `analitex-docs` for dispatch-triggered rebuilds

## Development Commands

```bash
npm install
npm start
npm run build
npm run serve
npm run typecheck
npm run clear
```

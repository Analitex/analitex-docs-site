<p align="center">
  <h1 align="center">Analitex Docs Site</h1>
  <p align="center"><b>Docusaurus engine for Analitex documentation</b></p>
  <p align="center">
    External docs content in, static site out, auto-deployed to GitHub Pages.
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/framework-Docusaurus-2ea44f" alt="Framework"/>
    <img src="https://img.shields.io/badge/runtime-Node.js-339933" alt="Runtime"/>
    <img src="https://img.shields.io/badge/deploy-GitHub%20Pages-222222" alt="Deploy"/>
    <img src="https://img.shields.io/badge/domain-docs.analitex.ru-0a66c2" alt="Domain"/>
  </p>
  <p align="center">
    <a href="#quick-start">Quick Start</a> |
    <a href="#architecture">Architecture</a> |
    <a href="#cicd-workflow">CI/CD</a> |
    <a href="#secrets-and-variables">Secrets</a> |
    <a href="#dns">DNS</a>
  </p>
</p>

---

Production URL: `https://docs.analitex.ru`

This repository (`analitex-docs-site`) is the docs engine for Analitex, a service for digitizing marketplace sales workflows. During CI, it pulls Markdown docs from `analitex-docs`, builds the static site, and deploys it to GitHub Pages.

Public links:
- Main site: `https://analitex.ru`
- Application: `https://app.analitex.ru`

## Quick Start

Install dependencies:

```bash
npm install
```

Run local dev server:

```bash
npm start
```

Create production build:

```bash
npm run build
```

## Architecture

Two repositories work together:

1. `analitex-docs`
   - Source of truth for Markdown content.
   - Docs live in the `/docs` directory.

2. `analitex-docs-site` (this repo)
   - Docusaurus engine and theme.
   - CI clones `analitex-docs` and replaces local `/docs` before build.
   - Deploys output through GitHub Pages.

## CI/CD Workflow

Workflow file: `.github/workflows/deploy.yml`

Triggers:
- Push to `production` branch
- `repository_dispatch` with type `docs-update`
- Manual run (`workflow_dispatch`)

Pipeline steps:
1. Checkout docs site repo.
2. Clone `analitex-docs`.
3. Replace local `/docs` and optional `/i18n` with external docs content.
4. Copy `registry/links.json` to `static/links.json` when present.
5. `npm ci`.
6. `npm run build`.
7. Upload and deploy with GitHub Pages Actions.

## Content Layout (`analitex-docs`)

```text
analitex-docs/
├─ docs/                                # default locale (ru)
│  ├─ _category_.json
│  └─ ...
├─ i18n/
│  └─ en/
│     └─ docusaurus-plugin-content-docs/
│        └─ current/
│           ├─ _category_.json
│           └─ ...
├─ registry/
│  └─ links.json                        # optional project link registry
└─ README.md
```

## Required GitHub Pages Settings

In `analitex-docs-site`:
- Settings -> Pages -> Source: `GitHub Actions`
- Custom domain: `docs.analitex.ru`

## Secrets And Variables

In `analitex-docs-site`:
- Optional secret: `DOCS_REPO_TOKEN` (required if `analitex-docs` is private)
- Optional DocSearch secrets: `DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`

In `analitex-docs`:
- Secret: `REPO_TOKEN` with permission to trigger `repository_dispatch` in `analitex-docs-site`

## Trigger From Content Repo

Create `analitex-docs/.github/workflows/trigger.yml`:

```yaml
name: Trigger Docs Site Rebuild

on:
  push:
    branches: [production]

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger rebuild in docs site repo
        run: |
          curl -X POST \
          -H "Accept: application/vnd.github+json" \
          -H "Authorization: Bearer ${{ secrets.REPO_TOKEN }}" \
          https://api.github.com/repos/analitex/analitex-docs-site/dispatches \
          -d '{"event_type":"docs-update"}'
```

## DNS

At the DNS provider for `analitex.ru`:
- Type: `CNAME`
- Name: `docs`
- Value: `analitex.github.io`

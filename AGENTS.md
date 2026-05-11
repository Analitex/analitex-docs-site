# AGENTS.md

## Project Context

- Project: `analitex-docs-site`
- Purpose: Docusaurus-based documentation site for Analitex
- Production URL: `https://docs.analitex.ru`
- Main public site: `https://analitex.ru`
- Application URL: `https://app.analitex.ru`
- Primary locale: `ru` (Russian), secondary locale: `en`
- Node.js: `>=20`

## Repository Architecture

- `docusaurus.config.ts`: site config, i18n, navbar/footer, theme config
- `src/pages/index.tsx`: custom homepage
- `src/pages/index.module.css`: homepage styles
- `src/css/custom.css`: global theme styles
- `src/config/projectLinks.ts`: typed source of project links used in UI
- `docs/`: local docs content (may be replaced in CI)
- `.github/workflows/deploy.yml`: CI/CD pipeline

## Multi-Repo Content Flow

This repo is the site engine. Content source of truth is external:

1. CI clones `analitex/analitex-docs` (branch `production`)
2. Replaces local `docs/` and optionally `i18n/`
3. Builds static site and deploys to GitHub Pages

Implication for agents:
- Do not assume local `docs/` will remain unchanged in production.
- Prefer persistent product/UI/config changes in site engine files.

## Current UI/Data Conventions

- Homepage uses custom design and Russian-first copy.
- Project links are stored in typed TS config:
  - `src/config/projectLinks.ts`
- Avoid hardcoded duplicate links inside components when possible.

## Working Rules For Agents

1. Keep Russian locale as default unless explicitly asked to change.
2. Preserve existing visual style direction on homepage and global theme.
3. Prefer typed config/data files over scattered hardcoded constants.
4. Make minimal, focused edits; avoid broad refactors unless requested.
5. Never revert unrelated user changes.

## Hard Execution Constraint

Do not run build/dev/serve commands unless the user explicitly asks.

Blocked by default:
- `npm run build`
- `npm start`
- `npm run start`
- `npm run serve`
- Any equivalent Docusaurus build/start/serve command

Allowed without asking:
- Static code edits
- File reads/search
- Type-only or lint-like checks only if explicitly requested

## When Unsure

- Ask a short clarifying question instead of guessing for risky changes.
- If a task can affect deployment behavior, call it out before editing.

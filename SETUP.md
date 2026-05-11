# Setup Checklist for GitHub Pages Deployment

## One-time Repository Setup

Complete these steps in the GitHub repository settings.

### 1. GitHub Pages Configuration
- [ ] Go to Settings -> Pages
- [ ] Source: select `GitHub Actions`
- [ ] Custom domain: enter `docs.analitex.ru`
- [ ] Wait for DNS check to complete
- [ ] Enable `Enforce HTTPS`

### 2. DNS Configuration

At the DNS provider where `analitex.ru` is managed:

- [ ] Create CNAME record:
  - Name: `docs`
  - Type: `CNAME`
  - Value: `analitex.github.io`
  - TTL: 3600, or provider default

- [ ] Wait for DNS propagation, typically 5 minutes to 24 hours.

### 3. Repository Secrets

If `analitex-docs` is a private repository, add this secret in `analitex-docs-site`:

- [ ] `DOCS_REPO_TOKEN`
  - Personal access token with `repo` scope
  - Can be a user PAT or dedicated service account token

Optional search secrets for DocSearch:

- [ ] `DOCSEARCH_APP_ID`
- [ ] `DOCSEARCH_API_KEY`
- [ ] `DOCSEARCH_INDEX_NAME`

### 4. Content Repository Setup

In the `analitex-docs` repository:

- [ ] Create `.github/workflows/trigger.yml` using the README template.
- [ ] Add secret `REPO_TOKEN`:
  - Must have permission to trigger `repository_dispatch` in this repo.
  - Create with `repo` and `workflow` scopes when using a classic PAT.

## Deploy on Demand

Deployments happen automatically on:
- Push to `production` branch
- Changes to `analitex-docs` repo via trigger workflow
- Manual workflow dispatch from the Actions tab

## Development Workflow

### Local Development

```bash
npm install
npm start
```

Visit http://localhost:3000

### Production Build

```bash
npm run build
npm run serve
```

### Update Docs

Push changes to `analitex-docs` repository. The trigger workflow rebuilds this site.

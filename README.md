# docs

## Files to edit most often

For everyday documentation work, you will mainly edit Markdown files under
`docs/`.

### Content pages

- `docs/overview.md`
  Controls the docs homepage at `https://ramryder-project.github.io/docs/`
- `docs/ramryder/overview.md`
  Controls the `RamRyder` project overview page
- `docs/ramryder/build.md`
  Controls the `RamRyder` build/setup guide
- `docs/ramos/overview.md`
  Controls the `RAMOS` project overview page
- `docs/ramos/build.md`
  Controls the `RAMOS` build/setup guide
- `docs/community/overview.md`
  Controls the community page
- `docs/roadmap.md`
  Controls the roadmap page

### Site structure and appearance

- `sidebars.ts`
  Controls the left sidebar grouping and document order
- `docusaurus.config.ts`
  Controls the site title, navbar, footer, GitHub links, and deployment URL
- `src/css/custom.css`
  Controls theme colors, typography, spacing, and visual styling

## Local development

### Node version

This project requires:

- `Node.js >= 20`

If your local machine does not have Node 20, you can use Docker for local
preview.

### Install dependencies

```bash
npm install
```

### Local preview with hot reload

```bash
npm run start
```

Then open:

- `http://localhost:3000/docs/`

### Local preview with Docker

```bash
docker run --rm -it -p 3000:3000 -v "$PWD":/app -w /app node:20 bash
npm install
npm run start -- --host 0.0.0.0
```

Then open:

- `http://localhost:3000/docs/`

### Production build test

```bash
npm run build
```

### Preview the production build locally

```bash
npm run serve
```

## Typical workflow

1. Edit Markdown under `docs/`
2. If needed, update `sidebars.ts`
3. Preview locally with `npm run start` or Docker
4. Verify production build with `npm run build`
5. Commit and push

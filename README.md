# docs

Documentation repository template for the `memx-lab` project family.

## Role

This repository is the technical documentation hub, separate from the main
homepage repository.

Use it for:

- getting started guides
- architecture docs
- project index pages
- roadmap and contributor docs

## Suggested published URL

- `https://memx-lab.github.io/docs/`, or
- `https://docs.memxlab.org/`

## Important config to update

In [docusaurus.config.ts](/home/yaz093/memx/docs/docusaurus.config.ts), update:

- `url`
- `organizationName`
- `projectName`

If you deploy docs under `/docs/` on the homepage domain, set:

- `url: 'https://memx-lab.github.io'`
- `baseUrl: '/docs/'`
- `projectName: 'docs'`

If you deploy docs to a separate docs domain, set:

- `url: 'https://docs.memxlab.org'`
- `baseUrl: '/'`

## GitHub Pages setting

For this repository, prefer:

- `Settings -> Pages -> Source: GitHub Actions`

Do not use:

- `Deploy from a branch`
- `main` + `/docs`

That branch-based mode serves the repository folder directly and skips the
Docusaurus build step.

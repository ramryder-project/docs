# memx-docs

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

In [docusaurus.config.ts](/home/yaz093/memx/memx-docs/docusaurus.config.ts), replace:

- `url`
- `organizationName`
- `projectName`

If you deploy docs under `/docs/` on the homepage domain, set:

- `url: 'https://memx-lab.github.io'`
- `baseUrl: '/docs/'`

If you deploy docs to a separate docs domain, set:

- `url: 'https://docs.memxlab.org'`
- `baseUrl: '/'`

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Projects gallery

This is a one-page Next.js gallery of Denys Sergushkin’s live prototypes.

## Where things live

- `data/projects.ts` is the only list. Name, description, topics, live URL, repo URL, image, alt.
- Cards are `public/cards/card-<repo>.jpg`, 1280×640.
- Topic ids are `agentic`, `spatial`, `erp`, `tools`. A new id also needs a `html[data-topics]` rule in `app/globals.css`.
- The page is a static shell. Filters read `?topic=` in the browser. `app/layout.tsx` has a small boot script so a shared link does not flash the full grid.

## Before adding a project

Request the live URL. Keep it only when the final response is 200. Skip healthcare-ui. Skip anything that has a repo but no live demo.

## Checks

`npm run typecheck`, `npm run lint`, and `npm run build`.

## Look

Paper background, serif name, poster cards, quiet motion. Honor `prefers-reduced-motion`. Do not drop a WebGL shader on the page. Use the shadcn components that are already here, and semantic colors in `app/globals.css`.

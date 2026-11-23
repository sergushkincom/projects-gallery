# Projects gallery

## Goals

One static page that shows every live prototype from the profile README, with the same topic groups. Filters are multi-select, counted, keyboard accessible, and written into the URL. Each card opens the live demo and the repo.

## Audience

Denys, and anyone who wants to open a prototype instead of reading a list: hiring teams, collaborators, and himself next month.

## Done

- Thirteen prototypes whose live URLs return 200, grouped as Agentic UI & AI agents, 3D & spatial, ERP & B2B tools, and Small tools & experiments.
- Designer cards where they exist. Real screenshots for Relative, Keyword Tracker, and Grocery first order.
- Filter chips, layout animation, light and dark, and an Open Graph image.
- On hover or keyboard focus the card strip slides up over the one-line description and topic dots, and the image scales slightly. Touch screens leave the description visible. Motion turns off when the visitor prefers reduced motion.

## Next

- Replace the three screenshots with designed cards when those exist.
- Point the README live link at the production domain if Vercel assigns a different host than `projects-gallery-pi.vercel.app`.

## Constraints

- Statically rendered. Project data lives in `data/projects.ts`. No live iframe on the card.
- Only URLs that return 200. healthcare-ui stays out. Profile entries with no live demo stay out.
- The page should stay light: paper grain instead of a WebGL shader, and images through `next/image`.

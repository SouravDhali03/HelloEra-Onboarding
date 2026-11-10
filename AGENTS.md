# HelloEra App Layout Rules

Read this file before adding or changing any authenticated module, dashboard page,
sidebar destination, newsfeed view, resource page, or coming-soon module.

## Universal application shell

The shared dashboard layout owns the application chrome and the only page-level
`<main>` landmark. Every module rendered inside `AppLayout` is content inside that
existing main region.

The shell has three layout responsibilities:

1. The top navigation is its own region.
2. The sidebar and the active module content share the same application wrapper.
3. The shared wrapper owns the max-width, spacing, background, and responsive shell.

Do not recreate those responsibilities inside an individual module.

## Module rules

- Never add a second `<main>` inside a module. This prevents nested main landmarks
  and keeps screen-reader navigation correct.
- Use `<section>` for a meaningful module or grouped content. Give it a visible
  heading or an accessible label when it does not have a visible heading.
- Use `<article>` for standalone content, such as an individual blog or resource
  detail page.
- Use `<div>` for visual layout, spacing, grids, columns, and styling-only wrappers.
- Add a module-specific `<header>` only when the module has real introductory
  content. Newsfeed and the Resources landing page do not need an extra header.
- Keep module-specific styling and content inside the existing main container. Do
  not add a new outer shell, sidebar, top navigation, or max-width wrapper.
- Make the whole interactive card a link when the card represents one destination;
  do not make only the title clickable unless the card intentionally has multiple
  independent actions.

## Exploration and repository hygiene

- Design experiments, throwaway prototypes, screenshots, comparison pages, and
  other exploration artifacts are local-only by default. Do not add them to the
  GitHub repository when committing or pushing product work.
- Keep exploration outside the production source tree when possible. If an
  experiment must live in the repository folder, leave it unstaged and exclude it
  from the commit explicitly; never use a broad `git add -A` without reviewing the
  staged file list first.
- Before every push, inspect `git status --short` and `git diff --cached --name-status`.
  The staged list must contain only the requested product or documentation changes.
- If an experiment is already tracked, do not silently delete it. Ask whether it
  should be removed from GitHub, or preserve it while ensuring future commits do
  not change it.

## Route rules

- A module belongs at its real product route, such as `/marketplace/` or
  `/resources/`.
- Do not create a `/coming-soon/[module]/` route just to show a coming-soon state.
  Render the reusable coming-soon content inside the existing module route and
  `AppLayout` until that module is implemented.
- Keep sidebar links and module routes aligned so navigation never points at a
  temporary presentation-only namespace.

## Before finishing a module change

Check the rendered page and confirm:

- Exactly one page-level `<main>` exists.
- The module is inside the shared shell rather than replacing it.
- The top navigation remains separate from the sidebar/content wrapper.
- The sidebar and content use the shared responsive max-width structure.
- The public URL is the module's real route.
- Keyboard focus, headings, links, and interactive cards remain accessible.

## Canonical implementation

The shared shell is implemented in
[`components/dashboard-layout.tsx`](components/dashboard-layout.tsx). If a module
needs a different visual treatment, change the content inside the shell rather than
duplicating the shell itself.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Instructions

This repository is a GitHub Pages collection of small static projects. Apply the global Codex rules first, then these repository-specific rules.

## Project Shape

- Keep each site or prototype isolated in its own top-level folder, for example `wedding/`, `hdd-2026/`, or `dieselcars-by-redesign/`.
- Do not modify existing project folders unless the task explicitly targets them.
- New public folders should usually contain `index.html`, local `assets/` when media is needed, and a folder-level `.htaccess`.
- Prefer static HTML/CSS/vanilla JS. Do not add a build step, package manager, framework, or runtime dependency unless the task explicitly requires it.
- A single self-contained `index.html` is acceptable for small landing pages. Split CSS/JS into separate files only when it keeps the page easier to maintain.

## Design And UX

- Match the intent of the page instead of reusing a generic template. Event invitations can be expressive; service/business prototypes should be clear, direct, and conversion-focused.
- The first viewport must show the actual subject: event, place, service, product, or brand. Use real or generated bitmap imagery when the page benefits from visuals.
- Keep mobile layouts first-class: no overlapping hero/nav/timer/form controls, no text clipped inside buttons, and no horizontal scrolling.
- Use accessible HTML: semantic sections, labels for form fields, useful `alt` text, visible focus states, and working `tel:`, `mailto:`, or route links where relevant.
- Avoid visible implementation notes inside user-facing pages. Put UX rationale and production notes in a separate markdown file when needed.

## Assets

- Prefer local assets over hotlinking. Keep files reasonably small and avoid duplicate images.
- If assets come from a public site, VK album, generated image, or another external source, record the source in the task notes or a local notes file.
- Do not commit secrets, private tokens, or private user content.

## Forms And Personal Data

- Treat form data as sensitive, especially registrations involving children.
- Do not log real submitted data or commit test data.
- For Google Forms integrations, only change `formResponse` and `entry.*` values when the user provides or confirms the target form.
- Prefer test submissions with obvious `TEST_*` values, and mention any live test rows created.
- If a static form only opens `mailto`, state that clearly in the implementation notes.
- Local autosave should stay in the visitor browser, typically `localStorage`, and must not send data anywhere until the user submits.

## `.htaccess`

- Add a `.htaccess` file to every new public folder, matching the existing cache/compression template used by `wedding/` and `hdd-2026/`.
- GitHub Pages does not apply Apache `.htaccess`, but this file is kept for Apache-compatible hosting and consistency with the repository.

## Verification

- Run the narrowest useful checks:
  - `git diff --check` for tracked edits when practical.
  - `node --check <file>` for standalone JS files.
  - Inline script compile checks for large inline JavaScript.
  - Local reference checks for CSS/JS/images in static pages.
  - Headless Chrome screenshots for desktop and mobile when visual layout changed.
- If a page is already published, verify the GitHub Pages URL only when the task includes push/publish work.
- GitHub Pages may serve cached HTML for several minutes. Use a version query string for live verification when needed.

## Git

- Keep diffs focused and folder-scoped.
- Do not push, force-push, or commit unless the user explicitly asks.
- Preserve `wedding/` and `hdd-2026/` as independent projects; do not use one as a scratch area for another.

# Vincent Truong — portfolio site

Personal portfolio for hardware recruiters and engineers (MS ECE at Georgia Tech, VLSI; RTL design and ASIC physical design). Single-page React app built with Create React App, deployed to GitHub Pages.

## Branches

- `master` — source code. Work here.
- `gh-pages` — compiled build output only, published by `npm run deploy`. Never edit it by hand.

## Commands

```bash
npm ci                 # install
npm start              # dev server
npm run build          # production build into build/
npm run test:a11y      # Playwright + axe accessibility checks against build/ (run build first)
npm run deploy         # build and push build/ to gh-pages — publishes the live site
```

In WSL there is no Linux Node yet; Windows Node fails on `\\wsl.localhost` paths. Either install Node in WSL (nvm) or copy the repo to a Windows folder and run npm there.

## Structure

- `src/content/content.json` — **all site content** (see Content model).
- `src/content/index.js` — `asset()` for image paths and the `sections` list (order, nav labels, U-designators; empty sections are hidden).
- `src/components/` — one component per section (`Hero`, `About`, `Experience`, `Projects`, `Research`, `Coursework`, `Footer` = Contact + site footer), plus `Section` (shared heading), `Pins`, `contactIcons`, `dates`.
- `src/styling/` — `index.css` holds the design tokens (light/dark on `:root`), base styles and `.button`/`.mono`; one CSS file per component.
- `public/images/` — all images (see below).
- `tests/a11y.spec.js` — accessibility suite.

## Design ("Tapeout")

Chip-layout look: warm grey die, indigo (`--primary`), amber routing (`--wire`), Familjen Grotesk + Martian Mono (Google Fonts in `public/index.html`). Content blocks are 1px-outlined "macros" with corner pins (`.macro` + `<Pins />`). Animation is GSAP via `useGSAP`, always inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` so the reduced-motion page is the finished page. Scroll reveals use `data-reveal` and animate opacity only (never visibility) so links stay in the tab order. Use only colors from the tokens; light-mode `--wire` is 3.45:1, so use `--wire-text` for amber text.

## Content model

Everything the site shows lives in **`src/content/content.json`**. Adding an item = add one entry to the right array + put its images in `public/images/`. Do not add new fields or one-off layouts for a single entry; if a field is genuinely needed, add it to the schema here and to the component for every entry of that type.

### Ordering

Arrays are rendered **in array order**; there is no sorting. Keep new entries **newest first** (insert at the top). Exception: the four original projects keep their existing order (Joystick Insight, Portfolio Website, Power V2G Model, Canvas Craft) — the owner chose not to reorder them. `featured: true` is reserved; only set it when the owner asks.

### `profile` (object)

| Field | Required | Notes |
|---|---|---|
| `name` | yes | |
| `greeting` | yes | Small label above the hero name ("Welcome!") |
| `headline` | no | One line under the hero name; hidden if empty |
| `about` | yes | Array of paragraphs |
| `headshot` | yes | `{ "src", "alt" }` |
| `resumeUrl` | yes | Used by both Resume buttons |
| `skills` | yes | Array of `{ "name", "icon" }`; icon is an SVG in `public/images/skills/` |

### `contact` (array)

`{ "label", "url", "icon" }`. `icon` must be a key in `src/components/contactIcons.js` (`linkedin`, `github`, `instagram`, `email`). `mailto:` links open in the same tab; all others in a new tab.

### `projects` (array)

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | kebab-case, unique; used for image file names |
| `title` | yes | |
| `date` | yes for new entries | `"YYYY"` or `"YYYY-MM"`; the four original projects have `""` |
| `summary` | yes | One sentence |
| `description` | yes | Array of paragraphs; this is what the card shows |
| `context` | no | Org / lab / course, e.g. `"Trident Systems internship"` |
| `tags` | no | Tools actually used, e.g. `["Verilog", "Innovus"]`; shown as pin labels |
| `links` | no | Array of `{ "label", "url" }` (GitHub, paper, demo, slides) |
| `images` | yes, or `[]` for no image | Array of `{ "src", "alt" }`; `images[0]` is the card cover |
| `featured` | no | Default `false` |

`projectsEmptyState` (`{ "title", "text" }`) is the closing "More in Progress!" card — not a project.

### `experience` (array)

`{ "slug", "org", "title", "location", "start", "end", "summary", "bullets": [], "tags": [] }`. Dates are `"YYYY-MM"`; empty `end` renders as "Present". Required: `slug`, `org`, `title`, `start`, `summary`.

### `research` (array)

`{ "slug", "title", "kind", "venue", "authors": [], "date", "summary", "description": [], "links": [], "images": [] }`. `kind` is one of `paper`, `poster`, `thesis`, `project`. Required: `slug`, `title`, `date`, `summary`.

### `coursework` (array)

`{ "code", "title", "term", "school", "topics": [] }`, e.g. `{ "code": "ECE 6130", "title": "...", "term": "Fall 2025", "school": "Georgia Tech" }`. Required: `code`, `title`, `term`.

`experience`, `research` and `coursework` are currently empty, so their sections and nav links are hidden; they appear as soon as an entry is added.

### Images

- Location: `public/images/<section>/` — `projects/`, `research/`, `experience/`, `profile/`, `skills/`.
- Naming: `<slug>-<n>.<ext>` starting at 1 (`joystick-insight-1.png`). Referenced in JSON as `/images/projects/<slug>-<n>.<ext>` (paths are relative to `public/`; components wrap them in `asset()`).
- Format: WebP, long edge ≤ 1600px, original aspect ratio, for new images. The existing images are still PNG because no converter was installed; convert them when `cwebp`/`sharp` is available and update the paths.
- Alt text describes what the image shows (e.g. "Simulink model of a 24-hour vehicle-to-grid simulation…"), never the file name. Skill icons use `alt=""` because their name is printed beside them.
- Never reference images outside the repo.

### Accuracy

Use only facts the owner provided. Never invent metrics, dates, collaborators, tools or results. Existing wording is kept verbatim unless the owner approves a change.

## Before committing UI changes

Run `npm run build` (with `CI=true`, warnings fail the build) and `npm run test:a11y`; both must pass.

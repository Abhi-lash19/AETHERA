# Aethera Technical Design

**Status:** Implementation-ready architecture specification, approved planning direction as of 2026-10-30. No application code, automated tests or GitHub Pages deployment have been verified.  
**Goal:** Implement the full approved tracker as a maintainable, responsive, static frontend. This document selects technical mechanisms; product and visual requirements remain defined by their own documents.

## 1. Source of truth and constraints

Before implementation, read:

1. `AGENTS.md` for change scope, quality and verification.
2. `docs/CURRICULUM.md` for the approved **7 phases, 14 modules, 31 core topics**, resource URLs, learning objectives, prerequisites and exercises.
3. `docs/TRACKER_SPEC.md` for learning activities, progress rules, recommendations, optional notes, bookmarks and publication.
4. `docs/UI_UX.md` for premium midnight/violet/cyan design, expressive animation, adaptive connected roadmap, desktop panel and mobile full-screen view.
5. `docs/PROJECT_STATUS.md` for what is actually implemented and verified.

**Do not use this technical document to rewrite a product decision.** If sources conflict or a required piece of learning content is missing, preserve the approved curriculum and explicitly report the gap.

Hard constraints:

- Host using **GitHub Pages** at the project site for `Abhi-lash19/AETHERA`.
- No application backend, database, login, cloud API, model inference, embedded training infrastructure or separate model lab repository.
- No mandatory OpenUI runtime or generative-UI dependencies. mkdir.directory and OpenUI are design references, not runtime services.
- Complete tracker functionality is allowed; keep the code modular, static and small enough for a personal project.
- Phone is **intended for viewing published progress**. The laptop browser is the editing environment.
- Never describe design completion as implemented behavior, or implementation as verified behavior.

## 2. Technology choices and rationale

| Concern | Chosen baseline | Reason |
| --- | --- | --- |
| Markup | Semantic HTML | Accessible, lightweight, easy to inspect |
| Styling | Modern CSS, custom properties, small modular stylesheets | Full custom visual identity and dark/light themes without a utility framework |
| Interactions | Native ES-module JavaScript | Handles tracker state, graph expansion, navigation and UI controls without a React dependency |
| Dev/build | **Vite, vanilla JavaScript template** | Fast local development, predictable static output, asset paths and reproducible GitHub Pages build |
| Map graphics | SVG lines/nodes + HTML lists/cards | Crisp responsive graph, keyboard-accessible alternative and CSS-driven motion |
| Charts | CSS/SVG progress indicators | Three progress bars, no charting package necessary |
| Data | Structured local JSON derived from committed curriculum Markdown | Keeps educational content out of rendering code |
| Editable state | Browser `localStorage` with versioned validation | Suitable for one laptop browser; no server |
| Published state | Deliberately sanitized JSON file served by GitHub Pages | Phone can fetch a public read-only snapshot |
| Navigation | Lightweight hash-based router | Supports deep links under a GitHub Pages subpath without server-side history fallback |
| Tests | Node's built-in test runner for pure logic; Playwright for browser acceptance checks | Verifies state, responsive controls and gestures without a runtime test dependency |

Use the current supported stable versions of selected development tools when Codex implements, record exact versions in the lockfile, and avoid unnecessary dependencies. Playwright is **development-only** and justified by the desktop/mobile interaction verification; it must not be bundled into the website.

Do not introduce React, Tailwind, a graph layout engine, an animation framework, a chart library or a runtime Markdown renderer without first demonstrating a concrete need. The connected map has a fixed, small curriculum and can use deterministic SVG coordinates; do not add physics simulation or force-directed layout.

### Explicit tradeoff

Vite adds a small **build-time** step in exchange for better modularity, previews, testing and reliable Pages deployment. The final site is still static HTML/CSS/JavaScript. The browser does **not** need Node.js or a server at runtime.

## 3. Recommended repository layout for implementation

This is an implementation blueprint, **not a claim that these files exist today**:

```text
AETHERA/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── public/
│   ├── data/
│   │   └── published-progress.json   # explicit public snapshot, initially unpublished
│   └── favicon.svg                    # optional original SVG
├── src/
│   ├── main.js                        # app bootstrap and application mode
│   ├── data/
│   │   └── curriculum.json            # structured derivative of CURRICULUM.md
│   ├── state/
│   │   ├── storage.js
│   │   ├── progress.js
│   │   ├── recommendations.js
│   │   ├── imports.js
│   │   └── publishing.js
│   ├── navigation/
│   │   └── router.js
│   ├── components/
│   │   ├── navigation.js
│   │   ├── progress-indicator.js
│   │   ├── roadmap-desktop.js
│   │   ├── roadmap-mobile.js
│   │   └── topic-detail.js
│   ├── views/
│   │   ├── home.js
│   │   ├── roadmap.js
│   │   ├── saved.js
│   │   └── progress.js
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       ├── layout.css
│       ├── components.css
│       └── motion.css
├── scripts/
│   └── validate-curriculum.mjs
├── tests/
│   ├── unit/
│   └── e2e/
├── .github/workflows/
│   └── pages.yml
├── docs/
├── AGENTS.md
└── README.md
```

File names can be adjusted slightly for clarity, but preserve the boundaries between **curriculum data**, **state and calculations**, **navigation**, **presentational components**, and **views**. Avoid one giant `index.html`, `main.js` or universal component.

## 4. Curriculum data and single source of truth

**Authoritative educational content:** `docs/CURRICULUM.md`. Its module mapping in Section B.1 and the topic details in Section D define the curriculum.

The browser needs machine-readable data. On first implementation, derive `src/data/curriculum.json` from the approved Markdown, rather than inventing lessons or asking the browser to interpret free-form Markdown at runtime.

### Structured data expectations

- `schemaVersion`, `curriculumVersion`; both are explicit. Schema version is an integer. Curriculum version changes when content/IDs or required activities change.
- `phases`: stable ID, name, order, and two `moduleIds`.
- `modules`: exact stable IDs, names, parent phase ID, order, and `topicIds` from Section B.1.
- `topics`: the 31 exact stable topic IDs, name, parent module, reason to learn, outcomes, essential prerequisite IDs, optional recommended prior learning, primary resource ID, optional supporting resources, practice instructions, required study activity definitions, understanding/completion check and next-topic hint.
- `resources`: stable ID, title, exact URL, type, verification status, and recorded caveats. Do not promote partially verified resources to `verified`.
- `activities`: stable ID within a topic, type, concise label, required/optional designation and related resource when relevant.
- `practice`: stable ID, instructions, applicability, hardware/cost note where provided, and optional conceptual alternative. An unexecuted training plan must never be equivalent to an actual adapter training run.

Suggested stable study ID: `<topic-id>:study-primary`; suggested required exercise ID: `<topic-id>:practice`. Prefix IDs with the parent topic to avoid collisions. Do not add fake checkbox steps for visual/interact stages that are not explicitly authored.

### Required source-to-data validation

Codex must **validate the structured derivative against the Markdown**, at least:

1. Exactly seven phases, 14 module IDs and 31 distinct core topic IDs.
2. Every curriculum topic maps to **exactly one** approved module, and no module contains an unknown topic.
3. Stable topic titles, phase/module membership and authored prerequisite IDs match the Markdown; no unknown prerequisites or cycles.
4. The primary resource URL, optional resource URLs, learning outcomes, exercise and completion check for every topic are present and traceable to their corresponding Markdown entry.
5. All URLs are syntactically safe `https:` destinations; recorded verification limitations are retained.
6. Activity IDs are unique and remain stable under topic reordering; no progress will be silently transferred when an ID is changed.
7. Do not inject unverified claims, fabricated performance numbers, new core lessons, or speculative resource links into the JSON.

A small deterministic conversion/validation script may be useful, **but do not build a fragile generic Markdown parsing framework**. A curated JSON derivative with explicit tests and a documented update procedure is acceptable. If the Markdown changes later, the JSON derivative must be reviewed and synchronized in the same change. Reject inconsistent data at build/test time rather than silently rendering missing or mismatched topics.

## 5. App state and read-only / editing modes

### Important GitHub Pages limitation

A public static site cannot securely know whether a visitor is on *the owner's laptop* or *the owner's phone*. Browser/device detection is **not authentication**. A stranger can open the public website and can edit their **own browser-local copy** of the tracker, but cannot change the author's published progress without repository write access.

Therefore use this clear, predictable model:

- **Public/read-only mode by default** for all visitors and devices, including the owner's laptop before opting in.
- On the owner's laptop, the user can deliberately select **Enable editing on this browser** in settings or another clear local control; remember that choice only in that browser.
- When editing is enabled, show actual local checkboxes, notes, bookmarks, and import/export; changes update that browser's local state only.
- On the phone the user simply stays in read-only mode and views the published snapshot. No phone editing workflow is required.
- Do **not** claim the editing switch prevents editing from other computers or authenticates ownership.
- For a first-time editor with no local state, initialize from the latest valid public snapshot **only after clear confirmation**, or begin empty when none exists. Never overwrite existing local edits with a newly deployed public snapshot.
- Do not apply public snapshot updates to local editing data automatically. Provide explicit import/replace if the user wants to adopt a different snapshot.

The live source for editable views is local state; the read-only view uses the deployed sanitized snapshot. If no public snapshot exists, display **No progress published yet**, not fictitious progress values.

### Local state schema, version 1

An illustrative shape, not an implemented file:

```json
{
  "schemaVersion": 1,
  "curriculumVersion": "aethera-core-v1",
  "activeTopicId": "nn-weights-operations",
  "topics": {
    "nn-weights-operations": {
      "completedStudyActivityIds": [],
      "understanding": "not_assessed",
      "practice": "not_started",
      "practiceSkipReason": "",
      "notes": "",
      "questions": "",
      "needsReview": false,
      "evidenceUrls": [],
      "updatedAt": null
    }
  },
  "bookmarkedTopicIds": [],
  "bookmarkedResourceIds": [],
  "recentTopicIds": [],
  "unmappedProgress": {}
}
```

The examples above are **field contracts**, not fabricated user progress. The persisted representation can omit untouched topics, with selectors supplying a default state. Keep `unmappedProgress` for IDs no longer present in the curriculum.

Key requirements:

- Store state under a namespaced, versioned key such as `aethera:local:v1` and validate before use.
- Treat untrusted import/local JSON as data, never render it with unsafe `innerHTML`.
- Use strict state enums from `TRACKER_SPEC.md`: `not_assessed | needs_review | can_explain | can_apply` and `not_started | in_progress | completed | skipped_for_now`.
- Auto-save local changes promptly. Catch quota, disabled-storage, malformed-data and write errors; display **Not saved** if appropriate instead of falsely claiming success.
- Avoid automatic destructive repairs of corrupted data. Offer an export/recovery path before reset.
- Keep up to ten distinct recent topics, newest first, with actual visit/update timestamps; do not infer study duration.
- Support the separate needs-review flag independently of the understanding level.
- Store optional notes, questions, evidence URLs and skip reasons **only locally** by default.
- One browser's localStorage does not sync to another browser or to GitHub Actions.

## 6. Derived progress and recommendation logic

Use **pure tested functions** that operate on validated curriculum and state. Rendering components must not separately invent percentage or prerequisite rules.

### Core progress

- **Study:** completed required study IDs divided by all required study IDs in core topics.
- **Understanding:** number of core topics with `can_explain` or `can_apply` divided by 31.
- **Practical:** number of completed applicable core exercises divided by number of applicable required core exercises.
- Keep skipped practice in the applicable practical denominator, never the numerator.
- Do not count optional exercises, bookmarked resources, notes, or resource link clicks as completed learning.
- Show numerator, denominator and a correctly rounded percentage. A zero applicable denominator means **Not applicable**.
- Reuse exactly the same calculations scoped to a phase or module. No combined overall score.

### Topic completion and next action

- **Conceptually complete:** all required study items completed and understanding at `can_explain` or `can_apply`.
- **Fully complete:** conceptually complete plus required practical marked `completed`; if no required practical applies, conceptual completion suffices.
- A skipped practice stays outstanding but does **not** block learning or satisfy a hands-on claim.
- Required prerequisite satisfaction is based on **conceptual completion**, not practical status.
- Prefer the chosen active topic and its next activity, then the first eligible unfinished core topic in curriculum order. Explain the reason. Manual navigation always works.
- Do not treat a recommended prior topic as a required dependency.
- Store no redundant progress percentage as the authoritative truth; always derive it from study, understanding and practice states.

The specific rules are fully documented in `docs/TRACKER_SPEC.md`; if there is a conflict, correct the implementation to match it, not vice versa.

## 7. Navigation and adaptive roadmap architecture

### Router

Use a small hash router, for example:

```text
/AETHERA/#/home
/AETHERA/#/roadmap
/AETHERA/#/topic/infer-kv-cache
/AETHERA/#/saved
/AETHERA/#/progress
```

The document remains at `/AETHERA/`; hash changes do not require server path rewrites. Validate hash segments against known IDs, provide a useful fallback for unknown topics, and preserve browser Back/Forward behavior. Always generate local asset URLs relative to the configured Vite base, never assume domain root `/`.

### Desktop roadmap

- Display seven phase nodes in a clearly ordered connected map; expand the selected phase to its two module nodes and reveal real topic nodes as needed.
- Use SVG paths/lines for connections and accessible HTML buttons/list rows for textual nodes where practical. A node can be visually positioned over the SVG.
- Generate true dependency edges from the curriculum's topic prerequisite IDs. Progression/sequence lines must be visually distinguishable from dependency edges.
- Use deterministic layout for this fixed-size graph. Avoid graph layout libraries, forces or random positioning.
- Permit pointer/keyboard selection and provide a **synchronized semantic hierarchical list** as an equivalent way to navigate the same nodes. Graph accessibility must not depend on SVG alone.
- Pan/zoom is optional, only if required by the finished graph. Provide visible reset controls if introduced. Do not capture normal page scrolling unnecessarily.
- Topic selection shows a contextual desktop panel; at narrower widths, switch to a focused detail view. Restore logical position on return.

### Mobile roadmap

- Render the same data through a **single-column vertical connected path** and expandable phase → module → topic hierarchy.
- Use natural document scrolling, visible tap actions and status labels. No miniature desktop canvas or mandatory pan/zoom.
- Topic details use a focused full-screen page with a clear Back action.
- Bottom navigation shows **Home, Roadmap, Saved, Progress**, respects device safe-area insets, and does not cover the final topic.
- Optional horizontal swipe can enhance a resource carousel, but cannot be the only control; no swipe-only navigation.
- Both maps must use identical topic IDs, prerequisites, statuses and recommendations despite different layouts.

Responsive layout decisions and animation guidance are in `docs/UI_UX.md`; do not duplicate CSS-specific rules into the data model.

## 8. Visual system, motion and accessibility implementation

- CSS custom properties define midnight/violet/cyan design tokens, balanced surfaces, spacing, typography and dark/light themes. User-selected **System / Dark / Light** theme persists locally. Do not treat draft color values as contrast-verified.
- Use meaningful semantic HTML landmarks, accessible buttons, labels, disclosure state and visible focus. Interactive SVG nodes need accessible HTML equivalents.
- Favor CSS transforms and opacity for expressive entrance, expansion, progress and selected-path transitions; use reduced-motion media queries to remove nonessential movement.
- No forced intro animation, background particles, frequent expensive blur effects, animation engine, or timers that block use.
- Progress bars have accessible labels and numerical text; color is never the sole completion signal.
- External links use safe `https:` URLs with descriptive text and appropriate `rel="noopener noreferrer"` when opening a new tab. Preserve local tracker context.
- Fonts/icons must be appropriately licensed. Prefer a system font stack and original SVG details over loading multiple heavy external packages.
- Render readable zero, loading, invalid import, unavailable storage, unpublished snapshot, failed fetch and empty-result states.

## 9. Export, import and publication

### Private backup export

Produce a downloadable versioned JSON backup of **local** progress, including notes, questions, bookmarks, review flags, evidence URLs and unmapped IDs. The download stays on the user's device and is **not published** by the app.

### Import

- Initial behavior is **Replace only**, no automatic merge.
- Validate schema version, curriculum/version compatibility, state enums, IDs, URLs, data types and reasonable size limits before mutation.
- Provide a preview of what will change, explain the overwrite, suggest exporting current local state first, and require deliberate confirmation.
- Unknown topic/activity IDs must be reported and retained separately in recoverable `unmappedProgress`, not silently reassigned or counted.
- Invalid or unsupported-version backups leave current state unchanged.
- If a write fails, preserve the previous state where possible and show a clear failure rather than partial success.

### Public progress snapshot

Create a separate **Export public snapshot** action that constructs an allowlisted JSON document from validated current state, and shows a preview before download.

Allow only:

- schema/curriculum version and snapshot creation timestamp,
- stable topic IDs and their required study completion flags,
- self-assessed understanding levels,
- practical statuses **without skip reasons**,
- selected current topic ID,
- optional **derived** phase/module aggregate counts and values, cross-checked against source topic statuses.

Explicitly **exclude** notes, questions, reflections, evidence URLs, bookmarks, skip reasons, private backup data, recent detailed activity and credentials. Do not serialize the entire local state and try to remove a few fields as an afterthought; construct the public snapshot from an explicit field allowlist.

The file committed to the public repository is `public/data/published-progress.json`. Its initial version should indicate `not_published` rather than fabricate achievements. The app fetches the deployed file in read-only mode, validates it and displays its snapshot generation time as such, not as proof of when deployment completed.

### Initial publishing workflow, intentionally manual

1. On laptop, **enable local editing** and update learning progress.
2. Choose **Export public snapshot**, inspect the allowlisted preview, then download the sanitized JSON.
3. Copy the exported file to `public/data/published-progress.json` in the local Git checkout.
4. Inspect the diff for accidental private data, commit that single snapshot change and push to `main`.
5. GitHub Actions rebuilds and deploys the updated static site.
6. On phone, open/refresh the Pages website and read the last successfully deployed snapshot.

**Important:** The hosted page itself does not write to GitHub and contains **no GitHub token**. A manual terminal/GitHub Desktop step is required to publish. Editing browser `localStorage` neither writes Git files nor triggers a GitHub Action.

Do not attempt a secret-bearing client-side GitHub REST API publisher. Do not claim the phone sees unpushed laptop changes. Include clear user instructions and distinguish **Saved locally**, **Snapshot exported**, and **Published and deployed**; the last state is only claimable after deployment is verified.

### Optional later automation, not part of initial release

A Windows Task Scheduler task every three hours is possible **only if** a secure, explicit bridge transfers the browser's editable state into a local sanitized snapshot file. A scheduler cannot directly read browser `localStorage`. Decide the bridge, authorization, failures and conflicts first. Do not create this automation during initial implementation.

## 10. GitHub Pages build and deployment

### Project URL and base path

Target URL pattern, **not yet verified active**:

`https://Abhi-lash19.github.io/AETHERA/`

Set Vite `base: '/AETHERA/'` (case-sensitive repository subpath). Use `import.meta.env.BASE_URL` or equivalent base-aware paths for runtime assets and public data. Test deep links like `#/topic/infer-kv-cache` after a hard reload.

### Build pipeline

- `npm ci` installs exactly the pinned lockfile dependencies.
- `npm run validate:data` checks the structured curriculum data and IDs.
- `npm test` runs pure-logic unit tests.
- `npm run build` generates the static site in `dist/`.
- `npm run preview` serves built output for local verification.
- `npm run test:e2e` runs browser flows; provide setup instructions if Playwright browser installation is needed.

Create a small workflow under `.github/workflows/pages.yml`, triggered on `main` pushes and manual dispatch. It should:

1. Check out the repository and set up a supported Node LTS version.
2. Run `npm ci`, data validation, unit tests and production build. Fail deployment if these fail.
3. Upload **only `dist/`** through the official Pages artifact action.
4. Deploy with `actions/deploy-pages` under the `github-pages` environment, using only required `contents: read`, `pages: write`, `id-token: write` permissions.

In the repository Settings → Pages, set **Source: GitHub Actions**, not a branch-root Jekyll publish, once this Vite-based workflow is ready. Use current supported action versions when implementation occurs. Browser acceptance tests may run locally or in CI when configured; state exactly where they ran.

### Deployment verification

A successful local build is **not** a verified website. Check the actual Pages URL for:

- The app and assets loading from `/AETHERA/`.
- Correct hash navigation and hard reload behavior.
- The full seven-phase/14-module/31-topic curriculum.
- Public snapshot fetching or an honest unpublished empty state.
- No accidental private data or secrets in deployed assets.
- Working mobile layout and representative interactive controls.
- Both light/dark themes; no missing images/icons and no console-breaking errors.

If Pages settings/permissions block deployment, report the exact blocker and leave deployment **NOT VERIFIED**. Do not invent a working URL.

## 11. Tests, accessibility and definition of done

### Automated unit tests

At minimum cover:

- 31 topic IDs and 14 module membership constraints.
- Required vs optional study activity counting and independent progress percentages.
- `needs_review`, `can_explain`, `can_apply` and practical-status transitions.
- Conceptual completion vs full completion, including the skipped LoRA adaptation case.
- Essential prerequisites versus recommended prior reading; deterministic next recommendation.
- Invalid progress import, schema/version mismatch, unknown IDs, replace preview/cancel and preservation.
- Public allowlist export: prohibit notes, evidence, questions, bookmarks and skip reasons.
- JSON round-trip and persistence failures where feasible.

### Browser acceptance tests

At minimum cover:

- Desktop: homepage, connected phase/module/topic map, equivalent accessible topic list, contextual topic panel.
- Mobile: 320, 360, 390, 430px; vertical connected roadmap, expand/collapse, bottom navigation, full-screen topic detail, native scrolling, safe-area behavior and no page overflow.
- Tablet and desktop: 768, 1024, 1280, 1440px; correct transitions between layout modes.
- Keyboard focus/Enter/Space/Back, browser back/forward, theme switching and reduced-motion behavior.
- Editable mode: check a study activity, save, reload, change understanding, skip practice, verify counts, bookmark, add private note, export/import.
- Read-only mode: public snapshot renders without functional edit controls; explicit unpublished or fetch-failure state.
- External resources and controls: working URLs and visible failure/empty states.
- Automated screenshots for representative dark and light states, reviewed for visual quality; do not claim real-device testing if only using an emulator.

Test on an actual phone when available, but distinguish device tests from emulator checks. Reproduce and fix critical issues before reporting completion.

### Codex delivery expectation

The user may authorize **one implementation task covering the full tracker**. That is compatible with this architecture, but Codex must organize its work internally into coherent checkpoints:

1. Baseline setup, structure and curriculum data validation.
2. Reusable design system and four primary views.
3. Adaptive roadmap and topic detail.
4. State, progress, recommendations, bookmarks, notes and backups.
5. Public snapshot workflow and GitHub Pages deployment.
6. Unit/browser tests, responsive verification, defects and documentation.

**Checkpoints are a work method, not permission to leave the product half finished.** Do not claim the complete tracker is delivered unless its specified features actually work and have been checked. Keep changes reviewable and commit only when authorized, following `AGENTS.md`.

After implementation, update `docs/PROJECT_STATUS.md` with exact files, verification commands and results, screenshots/tests performed, unresolved issues, Pages URL and deployment confirmation if available. If something cannot be verified, label it **NOT VERIFIED** rather than inventing success.

## 12. Explicitly deferred and excluded

- No account/authentication, backend API, database or private server.
- No OpenUI Generative UI renderer, LLM calls or AI-generated recommendation service.
- No custom CUDA/GPU/inference code, model training environment or separate engineering repository.
- No automatic laptop-to-GitHub synchronization in the initial release.
- No mandatory offline/PWA installation or service worker; external visual resources usually require internet.
- No automatic claim that educational resources run correctly on every mobile browser.
- No additional UI routes, features or elaborate build infrastructure unless necessary to satisfy the approved specifications.

**Technical baseline finalized for implementation planning. The application itself remains unimplemented.**

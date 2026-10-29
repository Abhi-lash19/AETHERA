# Aethera — AI Engineering Learning Tracker

A personal, visual-first learning workspace: understand the model, follow the connections, and build engineering judgment at your own pace.

Implements the approved **7 phases, 14 modules and 31 topics** as a static vanilla JavaScript site built with Vite. No backend, account, database, model inference or runtime framework. Exercises happen in linked resources or your own tools.

**Site:** https://Abhi-lash19.github.io/AETHERA/

See [Project status](docs/PROJECT_STATUS.md) for actual deployment and verification evidence.

## Use the tracker

- **Home:** current phase/topic, a reasoned next activity, and independent Study / Understanding / Practical progress.
- **Roadmap:** connected desktop phases, adaptive vertical mobile journey, expandable modules/topics, equivalent hierarchical list, search and filters.
- **Topic detail:** original curriculum objectives, prerequisites, resources and caveats, practical instructions, self-assessment, optional private notes/questions/review flags/evidence.
- **Saved:** browser-local bookmarks for individual topics and resources.
- **Progress:** phase/module breakdowns, outstanding work, recent visits/updates, backups and publishing instructions.
- **Appearance:** System / Dark / Light, reduced motion, keyboard/touch controls.

The site opens in **read-only published mode**. Select **Progress → Enable editing on this browser** to record local learning. This is a preference, not authentication: any visitor can edit their own browser copy. Existing local progress is never silently replaced by a published snapshot. First-time editors can explicitly opt to start from a valid snapshot.

Study, understanding and practice are independent. Opening a resource does not complete it. Skipped practicals remain outstanding and do not block conceptual learning. A written adaptation plan never counts as an actual adapter training run.

## Back up and publish

**Private backup:** Progress → Export private backup. This includes notes, questions, evidence, bookmarks and recoverable unknown IDs. Keep it private. Import validates and previews a **replace-only** operation; cancellation preserves existing data.

**Publish for your phone:**

1. Update learning in the laptop browser.
2. Select **Export public snapshot**, inspect the preview and download it.
3. Replace `public/data/published-progress.json` in this checkout with that file.
4. Inspect the diff, run `npm run build`, commit the snapshot and push to `main`.
5. Wait for the Pages workflow to succeed, then refresh the site on your phone.

Public snapshots contain only versions, creation time, current topic and study/understanding/practical states. Notes, questions, evidence, bookmarks, review flags, history and skip reasons are excluded. Build validation rejects unexpected public fields. The initial snapshot is intentionally `not_published`.

LocalStorage does **not** sync across browsers, phones or GitHub Actions. Exporting is not publishing. The website contains no GitHub token and cannot write to the repository. Clearing browser data can erase local progress; export private backups regularly. Corrupt storage can be downloaded for recovery before a deliberate reset.

## Development

Use Node 24 LTS (minimum 22.12). Development versions are pinned: **Vite 8.3.5** and **Playwright 1.64.1**. No runtime dependencies. Vite provides static bundling and the Pages base path; Playwright is only for browser verification.

```sh
npm ci
npm run dev
npm run validate:data
npm test
npm run build
npm run preview
```

With production preview running at `http://127.0.0.1:4173/AETHERA/`:

```sh
npm run test:e2e
```

The browser script uses installed Google Chrome (`channel: 'chrome'`) and isolated, disposable test contexts. Install Chrome from its official vendor if missing. Screenshots go to ignored `artifacts/`; no test learning data is published. Set `AETHERA_TEST_URL` to a deployed URL to check it. Chromium viewport/touch emulation is not real-phone or manual testing.

Logic tests live in **one file**, `tests/logic.test.mjs`, using Node's built-in runner. `scripts/browser-check.mjs` is a plain Playwright acceptance script without a separate testing framework.

## Curriculum maintenance

`docs/CURRICULUM.md` is authoritative; `src/data/curriculum.json` is its deterministic derivative. After an approved educational change, edit the Markdown and run:

```sh
npm run data:sync
npm run validate:data
npm test
```

Review source and JSON in the same change. The converter intentionally supports this document's authored format. Missing fields or register entries fail instead of generating content. Validation checks exact source equality, counts, membership, stable IDs, prerequisite cycles, HTTPS URLs and public snapshot safety. ID or required-activity changes need a deliberate version/migration decision; unknown imported IDs remain recoverable and uncounted.

## Deployment and documentation

`.github/workflows/pages.yml` installs from the lockfile, validates data, runs logic tests, builds, uploads only `dist/`, and deploys through official Pages actions. **Settings → Pages → Source** must be **GitHub Actions**. The case-sensitive Vite base is `/AETHERA/`; hash deep links work without server rewrites.

| Document | Source of truth |
| --- | --- |
| [Curriculum](docs/CURRICULUM.md) | Topics, outcomes, resources, prerequisites and exercises |
| [Tracker specification](docs/TRACKER_SPEC.md) | Interaction, progress and publication semantics |
| [UI/UX](docs/UI_UX.md) | Visual direction, responsive behavior and accessibility |
| [Technical design](docs/TECHNICAL_DESIGN.md) | Architecture, schemas and deployment guardrails |
| [Project status](docs/PROJECT_STATUS.md) | Actual checks, deployment, limitations and next milestone |
| [Agent instructions](AGENTS.md) | Development and handoff rules |

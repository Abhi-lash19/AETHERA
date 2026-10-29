# Technical Design — Minimal Static Tracker

**Status:** Proposed architecture; final technical choices pending product/UX approval. No code has been implemented or validated.

## Architecture goal

Aethera is a static, client-side learning tracker hosted on GitHub Pages. Keep code modular and dependencies minimal. **No backend, database, user login, model inference or separate lab repo.**

## Candidate architecture

```text
GitHub repository (Aethera)
  ├─ curated curriculum JSON and resource metadata (version-controlled)
  ├─ HTML / CSS / JavaScript static app
  ├─ optional published-progress.json (public, sanitized)
  └─ GitHub Pages (serves static app)

Laptop browser
  ├─ loads curriculum and published data
  ├─ keeps editable personal progress locally
  ├─ provides export/import as backup
  └─ manually publishes an approved public snapshot via Git

Phone browser
  └─ loads publicly deployed snapshot read-only; no edit credentials
```

## Suggested file structure once coding begins (not to create yet)

```text
Aethera/
  index.html
  assets/             # only assets actually used
  styles/             # tokens, layout, components
  scripts/            # UI, model, storage, progress calculation
  data/               # curriculum + public progress snapshot
  tests/              # logic and interaction tests as justified
  docs/
  AGENTS.md
  README.md
```

Do not prematurely choose a framework. Vanilla JavaScript modules are the default candidate. Adopt a build tool or framework only if user-approved UI complexity or maintainability actually warrants it.

## Data model — illustrative JSON schema design

Use stable IDs and a versioned format. The precise shape must be reviewed before coding:

```json
{
  "schemaVersion": 1,
  "curriculumVersion": "draft-1",
  "phases": [
    {"id":"foundation","title":"LLM Foundations","moduleIds":["tokens"]}
  ],
  "modules": [
    {"id":"tokens","title":"Tokenization","prerequisiteIds":[],"topicIds":["tokens-intro"]}
  ],
  "topics": [
    {"id":"tokens-intro","title":"How tokenization works","requiredActivityIds":["view-token-demo"],"resourceIds":["forwardpass"]}
  ],
  "resources": [
    {"id":"forwardpass","title":"Forward Pass","url":"https://forwardpass.dev/","verification":"section_review_pending"}
  ]
}
```

The example is **illustrative and incomplete**, not a final curriculum or schema. In a real version, external resource IDs, exercise definitions, objective fields, links, review dates and completion criteria need formal specification.

## Editable progress state (proposal)

- Use `localStorage` in the laptop browser for initial implementation, keyed with explicit app and schema version.
- Save activity completion by stable IDs, exercise status, self-assessed understanding, last active topic, optional reflections and timestamps.
- Validate JSON on load/import; handle missing/invalid data without silently deleting user progress.
- Use `try/catch` around storage writes; show actionable error and export option if persistence fails.
- Document data migration when schema versions change; don't change stable IDs casually.
- Private notes remain local by default; public snapshots should be consciously sanitized.

## Public progress publishing choices

### Initial recommendation: simple, manual

1. On laptop, choose **Export public progress** to produce a sanitized versioned JSON snapshot.
2. Review it for personal information.
3. Commit it to `data/published-progress.json` in the repository and push.
4. GitHub Pages deploys the snapshot with the static site.
5. Phone loads it as read-only progress.

**Not automatic:** a GitHub Action cannot read a different device's browser localStorage. Neither opening the site on a phone nor refreshing GitHub Pages syncs unpublished laptop edits.

### Optional later: scheduled laptop-side publisher

Requires an explicit bridge from browser storage to a local file and a local scheduled process with GitHub authentication. Windows Task Scheduler running every three hours may be possible; it must not be implemented until security, sync timing, conflict and failure handling are approved. Never store GitHub tokens in public JS or the published repo.

## Deployment

- Start with GitHub Pages using a static root `index.html` once code exists; verify configured source and published URL.
- If framework/build tooling is eventually chosen, revisit Pages base-path and workflow accordingly.
- Deployment status is unverified until the URL actually loads and static assets work under the repository subpath.
- Do not commit credentials. Content published in a public repo is public; scrub or omit private notes.

## Performance, quality and security

- Prioritize low JS weight, fast initial render, semantic HTML and responsive CSS.
- Support small mobile screens without horizontal scrolling, accessible controls and reduced motion.
- All external resources should use validated URLs, safe link handling and clear source attribution.
- Use content-as-data; never insert untrusted imported strings via unsanitized `innerHTML`.
- Define basic automated tests for progress calculations, serialization, import validation and prerequisite recommendations; browser tests for critical interactions where feasible.
- Clarify limitations of offline use: static app assets may cache, but third-party resources often require connectivity.

## Decisions currently accepted

1. Static GitHub Pages hosting.
2. Laptop edits and phone read-only.
3. No backend or DB for initial version.
4. No separate model experiment repo required.
5. Documentation and curriculum precede implementation.

## Decisions still open

- Vanilla JS vs optional light framework; app route/navigation method.
- Final curriculum/progress JSON schema and stable-ID migration policy.
- Public progress fields and privacy opt-in controls.
- Manual snapshot publication UI and import conflict semantics.
- Whether any automated deployment workflow is needed beyond branch publishing.

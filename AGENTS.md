# Instructions for Coding Agents (Codex) — Athena

## Mission

Athena is a **small static AI engineering learning tracker**, not an AI engineering experimentation platform. Implement only approved tracker behavior. No backend, database, auth provider, embedded model inference, separate lab repo, large framework or elaborate infrastructure unless requirements are explicitly revised.

## Read before any change

1. `README.md` — purpose and scope.
2. `docs/PROJECT_STATUS.md` — truthful current status and unresolved questions.
3. `docs/CURRICULUM.md` — curriculum and verification markers.
4. `docs/TRACKER_SPEC.md` — interaction and progress rules.
5. `docs/UI_UX.md` — responsive and accessibility requirements.
6. `docs/TECHNICAL_DESIGN.md` — technical guardrails.

Conflicts or unresolved decisions are not permission to invent behavior. Ask the user to approve the decision or make the smallest reversible change clearly labeled as a proposal. Do not treat draft content as a final user-approved specification.

## Work rules

- **Current stage is documentation/planning. Do not build dashboard UI until explicitly asked.**
- Before implementation, identify scope, files, dependencies, planned checks and exact definition of done.
- Work in small, reviewable commits; avoid giant single-file apps and unrelated refactors.
- Keep app data separate from rendering and user progress data. Use stable IDs and versioned schemas.
- Curated links must be direct and verified; do not fabricate section names, tests, measurements, user learning outcomes or URLs.
- Do not silently change curriculum objectives, completed learning status or an accepted decision.
- Do not put GitHub tokens, secrets or private notes into public static assets.
- Do not claim localStorage syncs across devices; public progress requires an explicit export/publish step.
- Make all controls functional, accessible, keyboard operable and touch usable. No fake buttons or swipe-only actions.
- Prefer native browser capabilities and few dependencies. Explain any new package.

## Verification expectations when code exists

- Install/build/lint/test only where applicable and report actual commands, exit status and failures.
- Verify progress saves and reloads, import/export validity, calculations and prerequisite recommendations.
- Check mobile widths including 320px and desktop/tablet layouts; check overflow, keyboard focus and expandable cards.
- Verify external links and GitHub Pages routing/base paths when deployed.
- Never mark something complete solely because code was written or an agent says it looks correct.
- If a test/tool cannot run, say **NOT VERIFIED** and give the exact blocker.

## Required handoff after meaningful changes

Update `docs/PROJECT_STATUS.md` with changed files, user-facing behavior, test evidence, outstanding issues, deployment state and the next single logical milestone. Update other documents only when their respective source-of-truth content changes, keeping decisions traceable. Do not auto-advance to the next phase without instruction.

# Tracker Specification — Product Behaviors

**Status:** Draft. This is a requirements baseline, not an implementation report.

## 1. User and scope

Single primary user, editing from a laptop and viewing from desktop/mobile. No collaborative editing, accounts, user management, video hosting, in-browser model execution, model training, backend APIs or separate lab repository.

## 2. Information hierarchy (proposal)

**Journey → Phase → Module → Topic → Activity/Resource/Exercise/Reflection.** Each item requires a stable ID so progress remains meaningful when the order changes. The user must be able to open resource links without losing the place in Athena.

## 3. Home screen requirements

- Show active module/topic, one actionable **continue learning** recommendation and why it is next.
- Summaries for learning activities, practical exercises, self-assessed mastery, and optional phase completion. These are separate metrics; avoid a single misleading percentage.
- Show progress with clear denominators (for example `7/12 topics`, not merely `58%`).
- Allow quick access to roadmap, resource library, notes/progress (if approved), and last-visited topic.
- Honest empty state on first use. No fabricated streaks, achievements or test statistics.

## 4. Roadmap / explorer

- Show phases and topics with prerequisites. Expand/collapse modules, accessible from keyboard and touch.
- Label topic states: **not started**, **in progress**, **completed** (optionally blocked/recommended as informational hints).
- A topic may be explored before prerequisites; warn gently rather than hard-lock by default.
- Allow filtering by phase/status and search only if the result justifies implementation effort.
- Each topic detail shows what/why/prerequisites, curated resources, ordered activity checklist, exercise, reflection, completion rubric and next recommended topic.
- External resources open predictably, preserve current tracker state and use safe links.

## 5. Activity and progress states — proposed

We need independent dimensions to prevent inflated completion:

- **Study:** required learning items reviewed (user ticks or marks each intentionally).
- **Practice:** explicit exercise status `not_started | in_progress | completed | skipped_with_reason` (final set TBD).
- **Understanding:** self-assessed `not_assessed | needs_review | can_explain | can_apply` (proposed, subject to discussion).
- **Evidence:** optional notes/link(s) and date; should never be mistaken for independently validated skill.

Draft derived rules: `studyPercent = completedRequiredStudyActivities / totalRequiredStudyActivities * 100` and `practicePercent = completedRequiredExercises / totalRequiredExercises * 100`; round only for display. Mastery is a category breakdown, **not an automatic percent** until a rubric has been approved. Exclude optional activities unless explicitly included; handle zero denominators as “not applicable.” Do not present a combined overall score until its formula is approved.

Topic completion is not final: provisional criteria are all required study items completed, required exercise completed or approved alternative, and understanding at `can_explain` or higher. **Do not implement this as a strict rule without approval.**

## 6. Recommendation logic — initial proposal

1. If the active topic has pending required activities, suggest the next one.
2. Otherwise, find a not-completed core topic whose required prerequisites are completed.
3. Prefer the earliest recommended curricular ordering; show why recommended.
4. If prerequisites are unmet, show what to review.
5. Never claim recommendations are AI-generated; deterministic logic suffices.
6. Allow manual selection and skipping without corrupting progress.

## 7. Notes and evidence

- Personal reflection field per topic (optional) and external evidence URLs (optional).
- Distinguish **private laptop data** from **publicly publishable progress**. Publishing notes must be explicitly opt-in, default off.
- Store timestamps for meaningful user edits; do not create fake study-time estimates.
- Editing notes on phone is out of scope for the initial version.

## 8. Persistence, export and publication

- Laptop browser storage saves changes; indicate save status and warn about browser data loss.
- Export and import a versioned JSON document with schema validation, ID validation, and clear merge/replace choice (choice TBD).
- Phone reads a published GitHub Pages snapshot; no edit controls or secret credentials there.
- Phase 1 can use **manual export + repository commit**; automate later only if clearly helpful.
- Publish only selected safe fields by default; avoid accidental private data leakage.
- Multiple laptop browsers do **not** automatically share progress. Define conflict and backup behavior before implementing sync.

## 9. User journeys to test

**New user:** first visit → see intro and recommended starter topic → open resource → return to topic → check item → refresh → state survives.  
**Returning laptop user:** open → continue last activity → complete exercise → record reflection → see progress update.  
**Phone reader:** open published URL → browse phase → expand topic → follow external link → return; no edit prompts.  
**Recovery:** export → clear simulated local state → import → validate restored IDs and counts.  
**Curriculum update:** add/rename an item while preserving progress by stable ID; handle removed IDs gracefully.

## 10. Nonfunctional requirements

- No horizontal overflow at 320px width; natural scrolling and usable large tap targets.
- Keyboard access, visible focus, semantic controls, clear feedback and reduced-motion support.
- Readable loading/empty/error states and resilience to unavailable third-party resources.
- Fast static loading, no sensitive tokens in client assets, no unnecessary dependencies.

## Decisions to approve before implementation

What qualifies for “complete”; assessment method; optional versus required activities; progress formulas; published data privacy; whether notes are needed; search and filters; recommendation strategy; import conflict behavior; whether streaks/time tracking are useful at all.

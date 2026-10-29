# Aethera Tracker Specification

**Document type:** Product behavior requirements  
**Decision status:** User-approved preferences plus delegated product-behavior decisions finalized on 2026-10-30. Module names and rules are documented; implementation remains pending.  
**Implementation status:** Not implemented. This document is not evidence that any feature works.

## 1. Purpose, user and boundaries

Aethera is a **personal, visual-first AI engineering learning tracker**. It organizes the approved learning journey, opens curated external resources, guides practice, and records learning progress. It does not teach by running models inside the website.

- **Primary user:** One software developer learning LLM internals, inference, hardware, local models, serving, adaptation and evaluation.
- **Laptop:** The place where the user updates progress, notes, bookmarks and evidence.
- **Phone:** Read-only access to published progress, curriculum and external resources. No phone editing is required.
- **Hosting direction:** A lightweight public static website on GitHub Pages.
- **Out of scope:** User accounts, collaboration, backend, database, LLM chat assistant, running experiments in Aethera, mandatory separate laboratory repository, gamified streaks, rigid study deadlines, or automatic assessment of actual engineering skill.
- **Guiding principle:** Show what to study, why, where, how to practice, whether it is understood, and what to do next.

**Sources of truth:** `docs/CURRICULUM.md` defines topics, prerequisites, resource mappings and exercises. This file defines user-visible tracker behavior and progress semantics. `docs/UI_UX.md` will define presentation, responsive layouts, gesture behavior and visual styling. `docs/TECHNICAL_DESIGN.md` will define implementation and persistence mechanisms.

## 2. Information hierarchy and navigation

**Approved hierarchy: Journey → Phase → Module → Topic → Activities.**

- **Journey:** The full AI engineering learning path.
- **Phase:** One of the seven curriculum phases.
- **Module:** A small, meaningful group of related topics within a phase, used for clearer navigation.
- **Topic:** A specific learning objective from the curriculum, identified by a stable topic ID.
- **Activities:** Resources to explore, study tasks, a practical exercise, an understanding check and optional reflection/evidence.

The approved curriculum defines **seven phases, 14 named modules and 31 core topics**. Their canonical module IDs, labels and exact topic memberships are listed in **Section B.1 of `docs/CURRICULUM.md`**. Each phase contains two modules; each topic belongs to exactly one. Do not duplicate or infer a different mapping from UI layouts. Module groupings are navigation metadata, not prerequisite gates; only topic IDs and their authored prerequisites determine eligibility.

### Navigation behaviors

1. Open the roadmap to explore phases.
2. Expand a phase to see its modules, each with a progress summary.
3. Open a module to see its topics and their current states.
4. Open a topic to see the learning guidance and actions.
5. Return to the same roadmap context without losing the previously selected phase/module or scroll position where reasonably possible.
6. Follow the intended order, or freely explore another topic. Unmet prerequisites should be informative, **not hard locks**.
7. Support clear, predictable return paths between journey, phase, module and topic.

Exact desktop/mobile navigation controls, card treatment and gestures belong in `docs/UI_UX.md`, not this specification.

## 3. Homepage: the first five things to show

The homepage must foreground these five items:

1. **Learning progress:** Separate study, understanding and practical progress summaries; show meaningful counts with percentages.
2. **Current phase:** The phase being worked on and its relative progress.
3. **Current topic:** The active or last-resumed topic, including its title and state.
4. **Next recommended activity:** One specific actionable step, with a short reason explaining why it comes next.
5. **Continue learning:** A prominent action that opens the active topic at its relevant pending activity.

The **complete roadmap** must be accessible separately from the homepage. The homepage should not display all 31 topics at once.

For a new user, show honest zero-state information and a clear starting topic. For a returning user, restore the saved active topic when possible. Never invent completion statistics, study streaks, learning time or exercise results.

## 4. Topic detail: what the user needs

Every topic page should provide the following information, derived from the curriculum wherever possible:

| Area | Required behavior |
| --- | --- |
| Identity | Topic name, phase, module, stable ID, and core/optional classification where defined |
| Purpose | Brief explanation of **why** the topic matters to AI engineering |
| Learning objectives | The specific concepts or abilities the learner should understand |
| Prerequisites | Necessary topics, with a clear way to open them; recommended prior learning may be shown separately |
| Primary resource | The best verified visual/interactive resource, prominently accessible by a direct external URL |
| Supporting resource | Optional deeper reference, visually secondary and not required to view the topic |
| Learning activities | Ordered, individually checkable study/visualization/interaction items where authored |
| Practical activity | Clear external exercise instructions, requirements, and a conceptual fallback when the curriculum defines one |
| Understanding check | The curriculum's explanation or self-assessment criteria |
| Reflection | Optional notes, remaining questions and a flag to revisit |
| Evidence | Optional links to a notebook, GitHub artifact, report, or other supporting work |
| Next topic | Prerequisite-aware suggestion and a way to navigate there |

Primary resources should not be buried behind multiple optional references. Resource pages are external; Aethera must not pretend that opening a link means the learning activity is finished. A resource may be labeled unverified or partially verified when that is its actual recorded status.

The topic activity sequence should follow **Visualize → Interact → Understand → Practice → Explain observations → Record progress**, but steps that do not apply to a particular topic must not become fake required tasks.

## 5. Learning activity and status model

**Approved:** Track study, understanding and practical activity **separately**. Do not infer one from another.

### 5.1 Study

- Each authored required study activity can be marked **not done** or **done** by the user.
- The user may reverse a completion mark.
- Opening a link, scrolling a page, or watching an unverified duration of video must not automatically complete a study activity.
- Optional study activities remain visibly optional and must not inflate required progress.

### 5.2 Understanding / conceptual mastery

Use the following self-reported levels:

| Level | Plain-language meaning |
| --- | --- |
| Not assessed | I have not evaluated my understanding yet |
| Needs review | I am not confident and should revisit this |
| Can explain | I can explain the concept and answer its completion check |
| Can apply | I can apply the concept to an appropriate example or decision |

The learner selects and can revise the level. These levels are **self-assessments**, not verified certificates. A learner can revisit a topic after marking it understood.

### 5.3 Practical activity

Support these distinct states:

| State | Meaning |
| --- | --- |
| Not started | No practical work recorded |
| In progress | Exercise has been started but not completed |
| Completed | The user reports actually completing the specified practical activity |
| Skipped for now | Exercise not performed, perhaps due to missing GPU, tools or time; remains outstanding and can be resumed |

Skipping must **not** block the next topic, but it must also **never** count as a completed hands-on exercise or disappear from an outstanding-work view. A short skip reason may be recorded, but should not be mandatory.

For the curriculum's guided adaptation trial, explicitly distinguish **conceptual completion** from **hands-on experiment completion**. A written training plan and baseline comparison protocol are not evidence that training ran.

### 5.4 Topic-level summary

The user should be able to tell whether a topic is **not started**, **in progress**, **conceptually understood**, or has an **actual completed practical activity**, without relying on a misleading single completion label.

### 5.4 Derived topic summary and completion rules

A topic can be described using these **derived** labels, while its three underlying dimensions remain visible:

| Derived label | Condition |
| --- | --- |
| Not started | No required study activity completed, no understanding rating selected, and no practical work started or completed |
| In progress | Any recorded progress exists but the topic does not meet conceptual completion |
| Conceptually complete | All required study activities are complete and the self-assessment is `can_explain` or `can_apply`; practical may still be unfinished |
| Fully complete | Conceptually complete **and** the topic's required practical exercise is marked `completed` |

- **Skipped for now** is an unfinished practical and does **not** produce Fully complete. It does not block continuing to other topics.
- A learning topic can show **Conceptually complete · Practical skipped** without contradicting itself.
- Every current core topic has a named practical activity. Its completion means the user actually performed the stated activity, whether a browser simulation, calculation, diagram, script, comparison or written engineering artifact. Only reading about an exercise is not completing it.
- The `adapt-guided-trial` conceptual fallback may satisfy a self-assessed understanding check, but cannot mark the hands-on training practical completed. Do not automatically infer an actual training run from a plan.
- An optional extension or advanced hardware run never becomes required merely by appearing as a resource or suggestion.
- Optional notes, evidence and bookmarks are not required for a topic's completion.
- The user may undo progress or lower their understanding assessment. Derived labels and percentages recalculate immediately.
- If a topic has no relevant required practice in a future curriculum revision, full completion requires conceptual completion only; show its practice as Not applicable rather than inventing an activity.

Do not create automated mastery scores, independent skill certifications, or completion based solely on page visits.

## 6. Progress summaries and calculations

**Approved:** Show exactly three independent core progress bars. Do not invent a combined score.

| Indicator | Numerator | Denominator |
| --- | --- | --- |
| Study | Completed required study activity IDs | All required study activity IDs in the 31 core topics |
| Understanding | Core topics self-assessed as `can_explain` or `can_apply` | All 31 core topics |
| Practical | Core-topic practical activities explicitly marked `completed` | All applicable core-topic required practical activities |

### Consistent counting rules

1. **Study:** Give every core topic at least one stable required study activity: review its primary curated resource and learning objectives. Additional authored required study activities can count if explicitly defined, but optional sources and optional deep dives do not. Viewing/opening a resource does not auto-check it.
2. **Understanding:** `not_assessed` and `needs_review` do not contribute to the numerator; `can_explain` and `can_apply` each contribute once per topic. This measures a self-reported level, not an independently tested skill.
3. **Practical:** Count an exercise only if the user explicitly marks the actual authored activity `completed`. Simulations, worksheets, diagrams and comparisons count if they are the actual exercise. A fallback reading plan or skipped run does **not** count as an executed practical. The LoRA/QLoRA training trial is never marked run merely because the conceptual plan is finished.
4. **Applicability:** The current curriculum specifies an exercise for every core topic. If a later version explicitly has no required practical for a topic, omit that topic from the practical denominator and display Not applicable for its practice.
5. **Skipped:** Keep `skipped_for_now` practicals in the applicable denominator, visibly pending. Skipping never creates a completed practice entry or blocks topic navigation.
6. **Display:** Show count and percentage together. Compute from raw counts and round only on display. For a zero denominator show **Not applicable**, not 100%.
7. **Scope:** Phase and module progress are the same three calculations limited to their member core topics. The homepage shows journey totals. Fully completed topic counts are separate from these bars.
8. **Optional:** Exclude optional references, advanced deep dives and optional hands-on extensions from the core denominators. Do not award points for taking notes, bookmarking or simply visiting.
9. **Identity:** Use stable topic IDs and stable activity IDs so reordering topics or modules cannot reset completion. If a curriculum update invalidates an activity ID, report it; never silently shift progress to a different activity.

**No weighted, averaged or combined overall percentage.** All bars represent different kinds of progress and must be labeled accordingly.

## 7. Continue learning and next recommendation

**Approved:** Recommend from the curriculum's essential topic prerequisites while preserving user control. This is deterministic guidance, not AI-generated personalization.

### Prerequisite satisfaction

- A required prerequisite is **met** when its topic is conceptually complete: all required study items done and understanding set to `can_explain` or `can_apply`.
- A skipped or unfinished practical on a prerequisite **does not prevent** the next topic from being recommended once conceptual completion is achieved.
- `Recommended prior learning` in the curriculum is advisory and must not become a hard prerequisite.
- If a learner chooses to open a topic with unmet prerequisites, allow it and show direct links to the missing concepts.

### Next-action selection

1. If the user has deliberately chosen an active topic, prefer continuing that topic over automatically changing it.
2. Within the active topic: surface pending required study work first, then the understanding check if not at `can_explain`, then an uncompleted practical when feasible.
3. When the topic is conceptually complete and its practical is `skipped_for_now`, offer **Continue to next topic** while keeping the skipped exercise on the outstanding-work list.
4. If a topic is conceptually complete with no pending required practical, recommend the earliest not-conceptually-complete core topic whose essential prerequisites are met, following the curriculum's topic order.
5. If nothing eligible is available, explain what prerequisite needs review. If all core topics are conceptually complete, suggest outstanding skipped exercises, review flags or optional deep dives rather than looping to the first topic.
6. Display a simple human-readable reason for every recommendation, such as `You can explain attention, so KV cache is available`. Never claim an AI agent assessed mastery.
7. Manual navigation, reviewing completed topics and changing the active topic remain available at all times.

**Current topic:** Persist the last deliberately selected topic ID. On first use, start from the first eligible curriculum topic. If the saved topic no longer exists, show a recovery message and select the first eligible topic without losing other saved progress.

## 8. Notes, questions, review flags and evidence

**Approved:** Each topic may optionally store all four forms of personal learning information:

1. **Notes/reflection:** What I understood or observed, in my own words.
2. **Questions:** What remains confusing or what I want to investigate.
3. **Needs review flag:** A simple way to return to the topic later, independent of its other progress statuses.
4. **Evidence links:** Optional links to GitHub, notebooks, reports or other external records.

None of these fields is mandatory to check a learning activity or record self-assessed understanding. An evidence link is a reference supplied by the user, not independent proof that the exercise worked. Personal notes and unanswered questions are private by default.

## 9. Discoverability, bookmarks and recent activity

**Approved features:**

- **Search:** Search topic names and relevant curriculum text; avoid promising full-text search inside linked websites.
- **Filters:** At least phase, progress state, incomplete work, needs review and bookmarked items. Exact combinations can be refined during detailed design.
- **Bookmarks:** Save favorite topics and individual learning resources for quick return. Bookmarks are distinct from completion.
- **Recent activity:** Show up to **10 distinct recently visited or updated topics**, newest first, with the last known visit/update time. Keep one entry per topic instead of an unlimited event-history feed. A topic visit is recorded only when the user opens that topic; the timestamp is not evidence of study duration.
- **Export/import:** Back up and restore progress and user-created learning data.

**Not required:** Daily streaks, leaderboards, achievements, social features or mandatory study-time tracking.

## 10. Persistence, public publishing and recovery

This section defines desired behavior; exact file formats, storage implementation and publication commands belong in `docs/TECHNICAL_DESIGN.md`.

### Local progress

- Progress edits on the laptop should be saved persistently in that browser and survive refresh or reopening.
- Show understandable saved-state feedback and warn that clearing browser data may erase unsynchronized work.
- Preserve existing progress against changes in topic ordering by using stable topic IDs.
- Do not claim progress automatically syncs across browsers or devices.

### Export and import

- Export a readable, versioned backup of study progress, understanding levels, practical statuses, bookmarks, notes, questions, review flags and evidence links.
- **Initial import behavior is Replace only**, not merge. Validate the schema and version, IDs, progress states, data types and basic size/URL safety before making any changes.
- Before import, preview counts and the effect of replacement; explicitly warn that existing local edits will be overwritten. Offer an export of current data first. Require a deliberate confirmation; cancellation leaves state unchanged.
- An unsupported backup schema version or invalid file must be rejected without altering saved data.
- Unknown topic/activity IDs from an otherwise valid backup must be shown to the user. Keep them in a recoverable, non-counted unmapped section of the imported data instead of silently reassigning them or deleting them. Allow re-export of that data for future migration.
- If replacement fails, preserve the previous saved progress and report the failure. A merge workflow can be added later only if it becomes genuinely necessary.

### Laptop-to-phone publication

- The laptop is the editing source. The phone is a read-only viewer of a deliberately published snapshot on GitHub Pages.
- A manual publication workflow is acceptable initially. Optional scheduled laptop publication can be considered later.
- Browser local storage is not accessible to GitHub Actions or a standalone laptop scheduler automatically.
- The **public snapshot allowlist** includes only: curriculum version, stable topic IDs, required study completion flags, self-assessed understanding levels, practical statuses (not skip reasons), selected current topic ID, topic and phase/module aggregate progress, and snapshot publication time. No other local fields are implicitly public.
- **Never publish by default:** private notes, personal questions, free-text reflections, evidence URLs, skip explanations, detailed activity history, local backup contents, access tokens or credentials. Bookmarks also stay private in the initial public snapshot unless explicitly approved later.
- The laptop publisher must provide an understandable preview of the allowlisted data before the user deliberately publishes it; publication is not implied by editing local checkboxes.
- A public snapshot is visible to **anyone with the URL**, not just the user's phone. Public URLs and screenshots must not claim confidentiality.
- Published information must never include access tokens, secrets or private credentials.
- A public website should not be treated as a security boundary based only on screen size or device detection; phone-read-only behavior describes the intended user workflow, not authentication.

## 11. Important user flows and acceptance checks

These are **future acceptance criteria**, not tests already run.

| User flow | Expected result |
| --- | --- |
| First visit | See honest zero progress, initial phase/topic and a meaningful starting activity |
| Explore | Navigate Journey → Phase → Module → Topic without losing place |
| Learn | Open primary visual resource, return, mark a study activity done, and see study progress change |
| Reflect | Set understanding to Needs review / Can explain / Can apply independently of practical status |
| Practice | Record in-progress, completed or skipped practical; a skip stays outstanding |
| Continue | Resume the active topic and see a reasoned next recommendation |
| Explore ahead | Open a topic with unmet prerequisites and receive guidance, not a hard block |
| Find content | Search/filter topics and open bookmarked topics or resources |
| Record evidence | Add optional notes, questions, review flags and evidence links |
| Refresh | Laptop edits persist and correctly reconstruct progress |
| Recover | Export a backup, import a valid backup and restore recorded data without silent loss |
| Publish/view | Publish permitted progress from laptop; phone displays the latest published snapshot without editing |
| Curriculum changes | Stable IDs keep prior state associated with the same topics; unknown IDs are reported |
| Empty/failure | Missing data, unavailable links and invalid imports produce informative feedback rather than false success |

## 12. Nonfunctional product requirements

- Keep the tracker understandable for one person, fast to navigate and free from unnecessary workflow steps.
- Every interactive control must have an actual useful behavior.
- Support keyboard operation, touch-friendly access and readable content on laptop, tablet and phone.
- Avoid horizontal overflow and inaccessible interactive elements on small screens.
- External learning resources must open predictably, and returning should not lose local progress.
- Provide clear empty states, loading states where relevant, validation errors and failure feedback.
- Do not assert that a video was watched, concept mastered, benchmark run or skill independently verified based on UI interaction alone.
- Visual design, navigation layout, breakpoints, swipe behavior, transitions, theming and accessibility details are specified separately in `docs/UI_UX.md`.

## 13. Approved choices and unresolved decisions

### User-approved product choices (2026-10-30)

- Homepage prioritizes progress, current phase, current topic, next task and continue learning.
- Roadmap is separate and follows **Phase → Module → Topic → Activities**.
- Study, understanding and practical statuses are separate.
- Understanding levels are Not assessed, Needs review, Can explain and Can apply.
- Three separate progress bars are preferred over a combined overall percentage.
- Skipped practicals do not block progression and remain visibly unfinished.
- Next recommendations consider prerequisites; manual navigation remains possible.
- Notes, questions, needs-review flags and evidence links are optional per topic.
- Topic details include primary visual resources, optional supporting resources, objectives, exercises and completion checks.
- Search, filters, bookmarks, recent activity and export/import are wanted.
- Existing laptop-edit, phone-view-only and static-hosting scope remains in effect.

### Finalized tracker behavior decisions (design baseline)

1. **Module grouping:** Section B.1 of `docs/CURRICULUM.md` is authoritative for the 14 named modules and all 31 stable topic IDs.
2. **Progress:** Three distinct core bars with precise counting rules in Section 6. No blended score.
3. **Completion:** Conceptual completion means all required study items and self-assessment at Can explain/Can apply. Fully complete additionally requires actual completion of every applicable required practical; skipped practice stays pending.
4. **Prerequisites:** Conceptual completion satisfies required prerequisites for next-topic recommendations. Practical skips do not gate learning.
5. **Import:** Validate and preview, then explicit Replace confirmation. Preserve unknown IDs separately without counting or silently discarding them. No automatic merge.
6. **Published progress:** Strict public allowlist in Section 10, with explicit preview and publication. Notes, questions, evidence URLs, bookmarks, skip reasons and detailed history stay private.
7. **Recent activity:** At most 10 distinct last-visited/updated topics, not a limitless feed.

### Outside this specification

- Precise color, typography, mobile layouts, navigation gestures, motion, iconography and component patterns are reserved for `docs/UI_UX.md`.
- Actual JSON schemas, storage APIs, backup validation mechanics, static publishing process and device presentation mode are reserved for `docs/TECHNICAL_DESIGN.md`.
- If new curriculum topics or modules are ever proposed, update the curriculum source of truth and reassess dependent tracker rules. Do not invent content at implementation time.

**Status:** Product behavior baseline documented; no application code, persisted progress, published dashboard or tests are claimed.

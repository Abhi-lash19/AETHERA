# Aethera Tracker Specification

**Document type:** Product behavior requirements  
**Decision status:** User-approved choices recorded on 2026-10-30; explicitly marked details remain open.  
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

The committed curriculum currently defines **seven phases and 31 core topics**, but does not define final module groupings. **Module names, IDs and assignments are still to be decided.** They must be mapped from the curriculum before implementation, without changing the existing 31 topic IDs merely to support the UI.

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

A separate count of fully completed core topics may be shown, but its exact threshold is **not yet approved**. In particular, an unfinished or skipped required practical must not be silently counted as performed.

Do not create automated mastery scores or award completion based solely on page visits.

## 6. Progress summaries and calculations

**Approved:** Display three independent progress bars, not a combined overall score.

| Indicator | What it communicates | Proposed computation, pending detailed approval |
| --- | --- | --- |
| Study progress | How much of the required learning activities have been marked done | Done required study activities ÷ all required study activities |
| Understanding progress | How many core topics the learner can explain or apply | Core topics rated `can_explain` or `can_apply` ÷ total core topics |
| Practical progress | How many required practical exercises have actually been completed | Completed required practical exercises ÷ total required practical exercises |

- Display numerator and denominator with each percentage, such as `8/31 topics`.
- Round only for display.
- If an indicator has zero applicable items, show **Not applicable**, not 100%.
- Optional resources and optional deep dives should not change the core denominator unless the user deliberately chooses to include them in a later approved design.
- Skipped practicals remain in the applicable denominator and therefore unfinished, but they do not prevent navigation.
- Conceptual fallbacks can satisfy a documented understanding check, but cannot be counted as a hands-on run.
- Phase and module summaries should use the same rules, scoped to their topics.
- **No combined overall percentage or weighted score.**

The three formulas above are **proposals consistent with the approved separate-bars requirement**. We should approve their exact denominator rules, especially topics without an appropriate practical exercise, before implementation.

## 7. Continue learning and next recommendation

**Approved:** Recommend the next eligible learning activity using prerequisites, while allowing free manual navigation.

Proposed deterministic behavior:

1. If the current topic has a pending required learning activity, recommend that activity.
2. Otherwise recommend its relevant understanding check or practical step, if applicable.
3. When ready to move on, select an unfinished core topic whose **essential** prerequisites have been met.
4. Prefer curriculum order among eligible topics and explain why the topic is suggested.
5. If a manually opened topic has missing prerequisites, show what they are and provide links to review them.
6. A skipped practical does not stop progression. Keep it visible as outstanding work.
7. The user can manually change their current topic and return to previously visited topics at any time.

Recommendations are simple curriculum-driven guidance, **not AI-generated personalization**. The exact prerequisite-satisfaction threshold (for example, studied versus can explain) remains open and must be settled before coding.

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
- **Recent activity:** Provide an easy way to resume recently visited or updated topics. Activity history reflects actual recorded actions, not fabricated study durations.
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
- Import must validate the data before changing saved progress and report invalid or unknown topic IDs.
- The user should see what will be restored and whether any existing state may be overwritten.
- Exact merge-versus-replace rules and conflict handling remain open design decisions; do not guess.

### Laptop-to-phone publication

- The laptop is the editing source. The phone is a read-only viewer of a deliberately published snapshot on GitHub Pages.
- A manual publication workflow is acceptable initially. Optional scheduled laptop publication can be considered later.
- Browser local storage is not accessible to GitHub Actions or a standalone laptop scheduler automatically.
- Only intentionally public progress should be published. **Private notes, questions and other sensitive learning data must not be published by default.**
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

### Still to settle before implementation

1. **Module grouping:** Names, IDs and mapping of the 31 core topics into modules, without changing curriculum topic IDs.
2. **Progress denominators:** Confirm mastery and practical percentage formulas, and treatment of topics with only a conceptual activity.
3. **Full topic completion:** Whether a topic can be called fully complete when its practical is skipped, or whether that status is reserved for genuinely completed practical work.
4. **Prerequisite eligibility:** Decide which learning/understanding status counts as satisfying a prerequisite for recommendations.
5. **Import behavior:** Merge versus replace, confirmation and conflict handling.
6. **Publishing/privacy:** Precisely which public progress fields may appear on the phone, and how they are approved for publication.
7. **Recent activity scope:** Minimal last-visited list versus a longer activity timeline, only if the added complexity proves worthwhile.

**No UI implementation, persistence mechanism, runtime behavior or verification is implied by this specification.**

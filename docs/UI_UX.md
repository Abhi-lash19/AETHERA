# Aethera UI/UX Design Specification

**Status:** Approved design direction and implementation-facing UX requirements, 2026-10-30. No mockup or live UI has been built, reviewed, or tested.  
**Scope:** Presentation, layout, navigation, visual design and interaction behavior for a personal AI engineering learning tracker.  
**Related sources of truth:** `docs/CURRICULUM.md` for seven phases, 14 modules, 31 topics and resource mappings; `docs/TRACKER_SPEC.md` for progress, completion, recommendations, search, notes and publication rules; `docs/TECHNICAL_DESIGN.md` for implementation and storage. This document must not redefine those behaviors.

## 1. Design intent and approved decisions

Build an original, polished **premium learning workspace with restrained futuristic engineering character**. It should make a technically demanding curriculum feel navigable and visually engaging without resembling a generic admin dashboard, gaming interface or public portfolio.

| Decision | Approved direction |
| --- | --- |
| Personality | Hybrid: premium learning workspace + futuristic engineering roadmap |
| Primary palette | Midnight navy with purposeful violet and cyan highlights |
| Theme modes | Carefully designed dark and light versions; dark-first visual direction |
| Information density | Balanced: readable summaries, expand to reveal deeper details |
| Roadmap | Connected node map, with actual prerequisite-aware meaning |
| Mobile roadmap | **Adaptive**: vertical connected phases and expandable module/topic structures, not a shrunken desktop canvas |
| Topic view | Adaptive: side panel on suitable desktops, focused full-screen detail view on phones |
| Mobile navigation | Persistent, accessible bottom navigation for four primary destinations |
| Motion | Expressive, purposeful interaction and transition animations, reduced or removed for accessibility |
| Hosting constraint | Must remain buildable as a **static GitHub Pages site**, without a required server or OpenUI generative runtime |

The user is learning for understanding, not competing with a deadline. Do not use guilt-oriented streaks, XP leaderboards, artificial achievements, fabricated progress, or a constant animated background.

## 2. Experience principles

1. **Learning first:** The active learning task and primary visual resource should be immediately discoverable. Decorative elements may never push necessary content out of reach.
2. **Visual-first, not visual-only:** Animation, connections and graphics supplement readable labels, short descriptions, exercises and accessible controls.
3. **Progress with integrity:** Visually distinguish study, self-assessed understanding and actual practical completion. A skipped experiment is not a completed experiment.
4. **Progressive disclosure:** Display essential information in overview cards; expand or navigate for objectives, resources, checklists, exercises and reflections.
5. **Responsive by design:** Mobile must have a purposeful information structure, not just scaled-down desktop panels.
6. **Reversible interactions:** Changing study checkboxes, understanding or practice status should provide immediate feedback and support reversal.
7. **Fast and comfortable:** Optimize for reading, short frequent visits and sustained study sessions. Expressive motion must not compromise performance.
8. **No false affordances:** Every visible clickable control must work. If an action is unavailable in read-only context, present it as unavailable or omit the editor affordance.

## 3. Information architecture and navigation

Canonical hierarchy: **Journey → Phase → Module → Topic → Activities**. There are seven phases, two modules per phase and 31 core topics. Names, IDs and module membership come exclusively from `docs/CURRICULUM.md`; do not invent alternatives in the UI.

### Primary destinations

| Destination | User purpose | Core content |
| --- | --- | --- |
| **Home** | Resume | Five essentials: learning progress, current phase, current topic, next activity, Continue learning |
| **Roadmap** | Explore and choose | Connected phases and modules; topic nodes, prerequisites, progress and selected path |
| **Saved** | Find quickly | Bookmarked topics/resources, plus search access |
| **Progress** | Inspect and manage | Independent progress summaries, phase/module breakdowns, recent activity, export/import and relevant settings |

The primary external learning resources still appear **inside their topics**. A separate permanent Resource Directory is not required for launch; search and bookmarks should make them discoverable without duplicating a fifth navigation destination. Topic detail is a contextual view, not a fifth primary tab.

### Navigation behaviors

- Home opens at a meaningful zero state or resumes the saved active topic; Continue learning takes the user directly to the next pending activity of that topic.
- Roadmap reveals phases and their modules, then topics, using the selected presentation for the device size.
- Topic selection retains source context: selected phase, module, and the user's previous roadmap scroll/location when returning.
- A prerequisite link navigates to its topic; missing prerequisites are informative, never a forced lock.
- Search can find topic names and authored curriculum text. Results show context (phase/module) and current status.
- Saved lists contain bookmarked topics and resources, but bookmarks do not affect progress.
- Progress provides a readable breakdown rather than a fabricated combined score.
- Browser back/forward navigation should behave predictably; do not trap the user in a side panel or discard the preceding roadmap context.
- Deep linking to a topic is desirable if achievable in a static site. Exact URL strategy belongs in `docs/TECHNICAL_DESIGN.md` and must work under the GitHub Pages repository path.

## 4. Desktop layout and connected node map

### Home on wide desktop

Use a **bounded content width**, comfortable reading columns and an optional persistent/collapsible sidebar:

```text
┌───────────────┬────────────────────────────────────────────────────┐
│ AETHERA       │ Greeting / current learning context              │
│ Home          ├────────────────────────────────────────────────────┤
│ Roadmap       │ Continue learning / next action (primary)         │
│ Saved         ├────────────────────────────────────────────────────┤
│ Progress      │ Study   | Understanding   | Practical             │
│               ├────────────────────────────────────────────────────┤
│ Theme         │ Current phase overview / roadmap entry           │
│               │ Recent learning and relevant quick links         │
└───────────────┴────────────────────────────────────────────────────┘
```

This is a **layout description**, not an approved screenshot. The five required homepage elements must remain above secondary widgets. Use actual data or a meaningful zero-state, never example percentages as live content.

### Roadmap on desktop

The connected node map is the defining visual experience. It must remain a **usable map of the curriculum**, not a decorative constellation:

- At the overview zoom, emphasize **seven phase nodes** in recommended order, with visible titles, status and progress indicators. Draw connections that explain progression.
- Selecting a phase reveals its **two named module nodes**; expanding a module reveals its **actual topic nodes**. Avoid placing all 31 verbose topic labels and all edges into the initial view.
- Distinguish **curricular sequence** from **true prerequisite connections**; where connections represent dependencies, use the IDs in the curriculum rather than guessing edges from position.
- Display a focused, readable selected path. Emphasize active, completed and recommended nodes with label/icon/shape plus accent color; soften unrelated connections, not their textual accessibility.
- Selecting a topic opens a contextual detail panel. Do not hide essential navigation or make the graph unusably narrow. On narrow laptop widths, switch to a wider topic view rather than squeezing both.
- Node selection must work by pointer and keyboard. The map must have a **synchronized accessible hierarchical list** of phases/modules/topics, not a graphical-only route to content.
- Initial node positioning should be deterministic and orderly. Avoid random positions, overlapping labels, edge spaghetti and arbitrary physics movement.
- Allow sensible zoom/pan on the desktop graph **only if** it improves usability; provide visible zoom/reset controls and avoid capturing the page's normal scrolling unexpectedly.
- Remember selected phase/module within the session where practical. This is presentation state, separate from learning progress.
- Do not encode a topic's knowledge status only as a colored node. Provide readable status text or an accessible label.

## 5. Mobile roadmap: adaptive connected vertical view

**Explicit final user choice: Adaptive connected roadmap.**

Mobile does **not** use a miniature desktop graph or require pinch-to-zoom, dragging, or two-finger gestures to find content.

```text
  AETHERA                               Theme
  Roadmap / 7 phases

  ●  Phase 1: Foundations          2 modules
  │     ▼ Neural Computation Basics
  │         ○ Topic 1
  │         ○ Topic 2
  │     ▶ Tokens and Representations
  │
  ●  Phase 2: Transformer
  │     ▶ Two modules
  │
  ●  Phase 3: Inference Mechanics
  │     ▶ Two modules
  │
  ⋮
  [Home]  [Roadmap]  [Saved]  [Progress]
```

### Required mobile behavior

1. Use a **single main vertical page scroll** with a meaningful continuous connecting line or stepping path.
2. Show phase title, ordinal, module count and progress/status in compact but readable cards or nodes.
3. Tap a phase to expand its two modules; tap a module to show its topics. An expanded branch keeps its connection and place in the journey visually clear.
4. A topic row shows a concise title and an explicit state, with enough tap area to open its full-screen topic view.
5. Opening a topic retains the roadmap position. The Back action returns to the prior expanded module and scroll position whenever feasible.
6. Do not depend on horizontal swipes for essential navigation. If optional swipeable resource cards are used, include visible controls and pagination indicators.
7. Natural vertical scrolling must work while a finger starts over a node, card, label or connector line. Never hijack scrolling for graph panning.
8. Keep connections behind content, visually restrained enough to maintain text contrast. Status icons and labels remain readable independently of line color.
9. No page-level horizontal overflow at widths down to 320 CSS px. Long technical words/URLs wrap appropriately.
10. Preserve a consistent curriculum and progress meaning between desktop and mobile even though the map presentation differs.

### Bottom navigation

Use four labelled destinations: **Home, Roadmap, Saved, Progress**. Provide a visible active state and screen-reader current-page information. Keep tap regions comfortably sized, ideally at least 44 by 44 CSS px, with space for device safe-area insets. A bottom bar must not cover topic actions, scroll endings, dialogs, or the last roadmap node.

On a topic detail view, navigation may be temporarily replaced by a clear header Back control if that reduces distraction, but the user must have an obvious path back. Never make a hidden swipe the only way out.

## 6. Responsive topic detail

### Desktop and wider tablet

- A selected topic opens a **contextual side panel** on sufficiently wide screens. It can occupy substantial width to make longer explanations readable; scrolling inside a panel should be predictable and not create accidental nested-scroll traps.
- Keep phase/module context and the ability to select another topic visible where space permits.
- Provide an explicit Close/Back action and keyboard-friendly focus management.
- As viewport width decreases, switch to a focused topic view rather than forcing a narrow panel.

### Mobile

- A topic opens as a **focused full-screen reading view**, not a tiny bottom sheet.
- Header: Back, topic name or short breadcrumb, and optional bookmark control.
- Present the core educational information in a purposeful order:
  1. Title and why it matters, plus phase/module context.
  2. Essential prerequisites, linked to their topics.
  3. Learning objectives and **primary visual resource** as the most prominent learning affordance.
  4. Ordered study/interaction checklist.
  5. Optional technical/deeper resource.
  6. Practical exercise, requirements and conceptual alternative when provided.
  7. Understanding assessment and completion check.
  8. Notes, questions, needs-review marker and optional evidence links.
  9. Next recommended activity/topic with an understandable reason.
- Use compact section headers and selectively expandable subsections so long topics remain manageable. Never hide the primary visual link or Continue action behind multiple required expansions.
- Allow comfortable selection and editing on laptop without dense forms. Phone presents published state read-only: progress indicators remain visible but editing controls must not appear to work.

For external resources, provide direct descriptive links that open predictably, preserve tracker state and indicate when leaving Aethera. Do not assume third-party pages can be embedded or that they support mobile interaction.

## 7. Visual identity and design tokens

### Color philosophy

**Approved mood:** midnight navy surfaces, violet for selected/current learning path, cyan for active learning affordances and highlights. Use a cohesive, premium palette, not gradients on every element.

Proposed starting colors **for design exploration, not contrast-tested final tokens**:

| Token role | Dark starting point | Meaning |
| --- | --- | --- |
| Background | `#0B1020` | Deep midnight canvas |
| Primary surface | `#121A30` | Cards, panels, navigation |
| Elevated surface | `#1B2641` | Hovered or selected surfaces |
| Violet accent | `#9877F8` | Selected path and key emphasis |
| Cyan accent | `#43CFE3` | Action cues, active links and progress highlights |
| Primary text | `#F4F7FF` | Long-form readable text |
| Secondary text | `#BBC5DC` | Descriptions and quiet metadata |

Implement **semantic color tokens**, not repeated hard-coded colors. Check and adjust contrast for both dark and light modes before finalizing values. Color names do not determine meaning by themselves: complete, in progress, needs review and skipped require shape/icon/text support.

### Light mode

Create a proper light palette with off-white backgrounds, cool neutral surfaces, dark readable text and adapted violet/cyan accents. Do not merely invert dark-mode colors or carry over pale contrast-weak text. Both modes use the same spacing, navigation and interaction model.

### Theme control

- Dark is the intended visual-first presentation; on first visit respect the device's existing preferred scheme when available, with a visible user override.
- A selected theme persists across page reloads on the editable laptop. Where settings are published to phones, do not assume automatic cross-device synchronization; phones can still use local theme preference.
- Theme switching should not wipe progress, reset navigation, or cause major layout shifts.
- Prefer direct and understandable options: **System / Dark / Light**, with accessible labels.

### Typography

- Use a readable modern sans-serif for content and a restrained monospaced treatment for technical IDs, code and short metrics.
- Ensure generous line height and comfortable paragraph width for study content; keep long paragraphs readable on mobile.
- Titles have a strong hierarchy without oversized display fonts consuming half the phone.
- Use fonts that can be loaded reliably without layout jumps; a system font stack is an acceptable default. Do not depend on proprietary fonts.
- Never place lengthy lesson prose in low-contrast tiny type.

### Cards, icons and illustrations

- Rounded cards, fine borders, subtle elevation and purposeful whitespace should establish hierarchy. Avoid stacking too many nested cards.
- Status icons, progress bar labels and completion counts must stay readable without hover.
- Use one consistent icon family; pair icons with text where meaning is important.
- Custom SVG path lines and light geometric motifs can reinforce the engineering theme. Avoid decorative graphics that resemble real progress/data but convey nothing.
- Resource previews are optional enhancements. Never scrape or copy unlicensed third-party screenshots, thumbnails or logos; do not rely on images for navigation.

## 8. Expressive motion and micro-interactions

**User-approved:** expressive animations, not an almost-static interface. Expressive means satisfying state changes and clear orientation, not continuous spectacle.

### Recommended animation opportunities

| Interaction | Intended feeling | Requirement |
| --- | --- | --- |
| Roadmap enters view | Guided reveal | Phase nodes/lines enter in a restrained sequence; map remains usable immediately |
| Expand phase/module | Spatial continuity | Branch opens smoothly; connector extends without shifting unrelated content excessively |
| Select a roadmap node | Clear focus | Selected path and node receive a short emphasis transition; irrelevant nodes remain legible |
| Open topic detail | Maintain context | Panel or full-screen view transitions from the selected topic with clear close/back |
| Toggle study/practice state | Satisfying feedback | Checkbox/icon and related progress bars respond immediately; visual state reflects saved state |
| Complete a module/phase | Meaningful milestone | One brief celebratory emphasis, not confetti loops or persistent effects |
| Theme switch | Polished continuity | Brief surface/text color transition without flicker or layout instability |
| Hover and focus | Responsive affordance | Subtle lift, border or glow on interactive elements; focus stays unmistakable |

### Motion limits and accessibility

- Prefer opacity and transform for effects where reasonable; avoid frequent large-layout recalculation, expensive blur layers and canvas particle systems.
- Suggested timing bands for initial exploration: **120–220 ms** for microfeedback, **220–400 ms** for panels/cards and **350–650 ms** for larger roadmap transitions. These are design guidelines, not hard-coded final values.
- No mandatory intro animation or wait before the learner can interact. Never tie successful progress saving to an animation finishing.
- Honor `prefers-reduced-motion`: remove nonessential movement, skip large spatial transitions and retain clear instant state changes.
- Avoid constant pulsing/glow and animated backgrounds during long reading. Do not use autoplaying educational media without deliberate user action.
- On lower-performance mobile devices, reduce animation complexity before degrading interaction responsiveness.
- Do not implement an entire animation engine or heavy dependency solely for transitions. The static-hosting requirement remains unchanged.

## 9. Component and state catalog

| Component | Expected user-visible behavior | Essential accessibility/failure handling |
| --- | --- | --- |
| Navigation item | Opens labelled destination; active state is clear | Keyboard access, current-page indication, focus visible |
| Phase node/card | Selects or expands a phase, shows count/status | Meaningful title, expanded state, touch target, no color-only status |
| Module branch/card | Expands/collapses topics | Proper expanded semantics and predictable focus |
| Topic node/row | Opens topic detail, carries progress state | Keyboard activation, readable status, alternative list to graph |
| Primary resource card | Opens exact curated URL | Descriptive link text, external destination indicated; no fake "watched" status |
| Study checklist item | Toggle authored required activity | Immediate count update, undo, persistence failure feedback |
| Understanding selector | Set Not assessed / Needs review / Can explain / Can apply | Readable selection with an explanation, not just colored dots |
| Practical status | Set Not started / In progress / Completed / Skipped for now | Skipped clearly remains outstanding; optional reason |
| Three progress bars | Independent Study / Understanding / Practical values | Numerator/denominator accessible and never combined |
| Bookmark | Save/unsave topic or resource | Reversible and visible state, offline/local-storage errors surfaced |
| Search/filter | Find applicable topics and saved resources | Clear action, results count and helpful no-results state |
| Recent activity | Return to last visited/updated topics | Accurate timestamps, not invented study duration |
| Export/import | Back up and restore local progress | Clear confirmation, validation, cancel and failure states |
| Theme selector | System / Dark / Light | Consistent contrast, saved preference, keyboard access |

**Phone read-only mode:** Show progress and details without editable controls. Public data never includes private notes/questions/evidence by default. Do not imply a security boundary just because a mobile navigation layout is present. These are product and technical constraints already defined in the tracker spec.

## 10. Screen states and content handling

All layouts and components must have designed states for:

- New user with **0%** progress, no active topic and no bookmarked resources; show an inviting, actionable start.
- Returning user with current phase/topic and last activity.
- In-progress, conceptually complete, fully complete, needs review and skipped practical.
- A topic manually explored before essential prerequisites; show the suggested learning order without preventing access.
- No search/filter results, and empty Saved/Recent views.
- Long titles, long URLs, dense technical instructions, snippets and possibly formula notation without overflow.
- Missing or partially verified resource information, and a third-party resource that fails after being opened. Never fabricate availability detection.
- Local storage or export/import failure, invalid backup, and an explicit successful save/restoration confirmation.
- Read-only published view when no published progress exists; show a clear message, not fabricated sync.
- Published snapshot older than local edits where the app can genuinely know this; otherwise do not claim freshness.
- Browser with JavaScript disabled or unavailable: provide a meaningful static shell or explanation appropriate to the chosen static architecture.

## 11. Responsive and accessibility acceptance criteria

### Representative viewport checks

| Width | Expected presentation |
| --- | --- |
| 320, 360, 390, 430 CSS px | Single-column mobile; vertical connected roadmap; bottom nav; full-screen topic view |
| 480–767 CSS px | Comfortable mobile/wide-phone presentation; adaptive layout rather than graph shrink |
| 768–1023 CSS px | Tablet: staged or compact roadmap and focused topic view, limited simultaneous columns |
| 1024–1279 CSS px | Desktop-like navigation where space permits; avoid unusably narrow graph + panel |
| 1280 and 1440 CSS px | Full roadmap node map, bounded content and contextual topic side panel |

Breakpoints are **design guidance**, not strict code constants. Base decisions on usable space and interaction capabilities, including landscape orientation, browser zoom and accessibility font scaling.

### Usability checks for implementation

1. No page-level horizontal overflow at the target mobile widths. Long technical terms and labels do not clip critical controls.
2. All essential actions work using **tap**, pointer and keyboard; **no swipe-only** navigation.
3. Bottom navigation respects safe-area insets and never blocks last content or controls.
4. The desktop node graph provides an equivalent semantic list/tree of all topics, with navigation and status information.
5. A user can expand phase → module → topic, open a resource, return and continue at the same logical place.
6. Buttons and controls have accessible names, visible keyboard focus, logical focus movement and appropriate expanded/current/selected semantics.
7. Use readable contrast in both themes. Do not rely on purple/cyan differences to convey status.
8. Support OS reduced-motion settings, zoom and text-size increases without unusable layout.
9. Check one-handed mobile interaction for bottom navigation, topic Back, expand/collapse, checklist and bookmark actions.
10. Check loading/empty/failure feedback. Buttons cannot visually report success when saving fails.
11. Test touch scrolling while starting gestures over graph connectors and interactive cards. The vertical map must not interfere with normal scrolling.
12. Verify both light/dark screenshots at representative widths plus actual pointer, keyboard and touch interactions. Any untested device/browser must be reported as **NOT VERIFIED**.

## 12. Design references and reuse policy

### mkdir.directory: inspiration discovery

- Source: https://mkdir.directory/
- Purpose: discover curated design galleries rather than install a UI framework.
- Candidate areas: dashboard cards (Collect UI), movement and interaction patterns (Codrops), dark color/layout studies (Dark Mode Design), and responsive navigation (Navbar Gallery or similar collections).
- Treat gallery links as **research leads**. Do not claim an individual example was approved or its code/assets are reusable without inspecting that example and its license.
- Our design should combine coherent patterns into an original Aethera identity, not copy a complete commercial design.

### OpenUI: component behavior reference, not runtime dependency

- Source: https://www.openui.com/
- Source repository: https://github.com/thesysdev/openui
- OpenUI is primarily an open-source **Generative UI** toolkit, with model-generated interfaces and a renderer. It is not needed to build a deterministic learning tracker.
- Relevant inspiration: cards, accordions, charts, structured controls, reusable design tokens and stateful interface patterns.
- **Do not integrate OpenUI's model runtime, MCP backend or chat/agent scaffolding** for Aethera. Do not install its packages solely because this document references them.
- If future implementation adopts a standalone component, verify license, framework compatibility, bundle impact and accessibility first; the choice belongs to `docs/TECHNICAL_DESIGN.md`.

### Asset policy

Use original SVG/CSS shapes and appropriately licensed icons, imagery or fonts. Maintain source attribution where necessary. Decorative screenshots from galleries are not automatically licensed for reuse.

## 13. GitHub Pages and handoff boundaries

This UX design must be implementable as a static frontend. Client-side interactivity, SVG roadmap graphics, CSS transitions, theme switching and locally saved preferences do **not** require a backend. An optional build process may output static assets, but no design requirement should force an LLM API, authenticated server or database.

**Not part of this design document:** choosing React versus vanilla JavaScript, exact data schemas, how browser storage is bridged to a scheduled publisher, GitHub Actions configuration, privacy enforcement mechanics, or the concrete router/base-path implementation. Those decisions remain in `docs/TECHNICAL_DESIGN.md`, constrained by the approved tracker behaviors and this UX design.

### Design handoff for Codex, after implementation is authorized

- Build the agreed experience in small, verifiable slices rather than one giant dashboard file.
- Maintain a consistent visual system across Home, Roadmap, Saved, Progress and topic detail.
- Use the curriculum's real phase/module/topic IDs, never placeholders marked complete.
- Ensure every interactive control has a real action, persistence behavior where applicable and an understandable failure state.
- Provide screenshots or visual evidence at mobile and desktop widths, identify what was actually tested and report gaps.
- **Do not implement from this document alone.** Read `AGENTS.md`, `docs/CURRICULUM.md`, `docs/TRACKER_SPEC.md`, `docs/TECHNICAL_DESIGN.md`, and `docs/PROJECT_STATUS.md` before beginning an authorized coding milestone.

**Final design decision:** Aethera will offer a desktop connected node map and a mobile vertical connected roadmap, preserving the same learning content and statuses with different spatial presentations. This design specification does **not** claim that either interface is implemented or tested.

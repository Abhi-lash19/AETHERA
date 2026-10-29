# UI/UX Direction — Aethera

**Status:** Design requirements draft, not approved mockups. The final visual style will be discussed before Codex implementation.

## Design objective

Create a premium, calm, modern personal learning experience—not a generic SaaS admin template and not a public portfolio. It should feel inviting for daily learning while making complex topics easy to scan and explore.

## Design principles

- **Purpose before decoration:** motion supports orientation and feedback, not distraction.
- **Progress without pressure:** emphasize next steps, not guilt-inducing deadlines.
- **Visual hierarchy:** current activity > topic detail > supporting statistics.
- **Readable learning:** long resource descriptions, requirements, equations and instructions stay readable.
- **Accessible by default:** contrast, type size, focus indicators, meaningful icons and plain-language labels.
- **Responsive, not merely squeezed:** adapt information architecture when space narrows.

## Proposed screens (to validate)

1. **Overview / Today:** continue learning, next action, phase progress, recent learning, quick roadmap access.
2. **Roadmap:** phases + dependency hints, expandable topic/module list, current position, completion states.
3. **Topic detail:** objective, why, prerequisites, recommended resource, secondary resources, ordered steps, experiment instruction, reflection, completion rubric, next topic.
4. **Resources:** optional filtered directory of vetted links; only build if it improves discovery beyond topic pages.
5. **Progress / notes:** optional breakdown, notes/evidence access, export/import; may be integrated into overview instead of a separate page.

## Responsive behavior

| Context | Proposed layout | Critical details |
| --- | --- | --- |
| Wide desktop | Bounded content width, persistent or collapsible nav, overview grid and detail panel | Don't waste space or make reading columns too wide |
| Tablet | Simplified 2-column or stacked sections | Preserve touch targets and content hierarchy |
| Phone ≤ 480px | Single-column cards, compact top navigation or bottom nav **if justified** | 320px support, no horizontal overflow, readable labels, no tiny indicators |

## Touch and gesture policy

- Primary interaction is **tap**, with native vertical scrolling.
- Use native-feeling horizontal swipe **only** where useful, e.g. phase cards or a resource carousel; show visible indicators and alternative controls.
- Expand/collapse using large semantic buttons, not hidden gestures.
- Avoid swipe-only functionality, nested horizontal scrolling traps and scroll hijacking.
- Respect system back navigation; restore scroll/focus where practical after returning from a topic.
- Touch targets should be comfortably sized (aim ≈44 CSS px for primary touch controls) with adequate spacing.

## Interaction specification checklist

For each control Codex implements, document its action, saved state, default state, keyboard behavior, screen-reader label and failure state. Examples:

- Topic accordion: click/tap/Enter/Space toggles; proper `aria-expanded`; preserves intentional open state where useful.
- Progress checkbox: updates visual/count state immediately and persists after refresh; undo is possible.
- Resource link: opens correct URL, descriptive label, external-link indication where useful; app state remains intact.
- Theme control: respects OS preference initially, persists chosen override; accessible contrast in both modes.
- Import/export: explicit feedback for success, invalid file, incompatible schema and replace confirmation.

## Visual system to define during design review

- Palette: dark and light themes with high contrast; accent colors purposeful, not overwhelming.
- Typography: strong heading hierarchy, comfortable body line height, code/technical terms distinct but readable.
- Layout: consistent spacing scale, rounded cards used deliberately, predictable alignment and max text width.
- Iconography: consistent set with accessible labels; icons must not be the sole communication channel.
- Motion: subtle expand/collapse and state transitions; follow `prefers-reduced-motion`.
- Resource previews: no unlicensed copying of thumbnails or third-party illustrations; external links remain primary.

## Essential states

- Brand-new profile with zero progress.
- A phase/topic in progress, complete, or awaiting prerequisites.
- No results for search/filter (if built).
- Offline/unavailable resource (do not promise third-party status detection if no network check).
- Browser data unavailable or quota exceeded.
- Invalid/corrupt import and successful recovery.
- Published progress older than laptop's local edits (where knowable).

## Accessibility and verification acceptance

- All functionality usable via keyboard; visible focus, reasonable tab order, labeled controls.
- No critical information conveyed by color alone.
- Reduced-motion mode and contrast checked in both themes.
- Test phone viewports at 320, 360, 390, 430px; tablet 768px; desktop 1280px and 1440px as representative widths.
- Verify actual tap, expand/collapse, scrolling, link navigation and long-text wrapping on a touch-capable device or suitable emulator; do not claim real-device testing unless performed.
- Avoid obstructing content with sticky navigation/safe-area insets.

## Design questions pending

Preferred visual direction (editorial minimal, futuristic technical, warm academic or hybrid); whether navigation should be sidebar/tabs; how much detail on overview; whether resource images add value; how progress cards are arranged; use of illustrations; dark vs light as default; which swipes genuinely improve navigation.

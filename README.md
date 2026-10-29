# Aethera — AI Engineering Learning Tracker

> **Status:** Planning only. No application or dashboard has been implemented.

Aethera is my personal, visual-first AI engineering learning tracker: one attractive, mobile-friendly website that tells me **what to study, why it matters, where to learn it, what to try, how to tell whether I understood it, and what comes next**.

This is **not** an AI engineering lab, an AI model, an online IDE, a course-hosting service, or a public portfolio. Any exercises happen in external websites, notebooks or projects; Aethera provides guidance and may record links to evidence.

## Product principles

1. **Curriculum first:** agree on learning order and resources before developing the UI.
2. **Visual-first:** recommend animations, interactive explanations and diagrams wherever genuinely useful.
3. **Understand, don't just click:** track studying, practice and conceptual understanding separately.
4. **Lightweight:** static GitHub Pages site; no backend, database, login or separate lab repository required.
5. **Personal use:** edit progress on laptop; browse published progress read-only on phone.
6. **Responsive by design:** touch, small screens, keyboard and accessibility are not optional.
7. **Truthful status:** planned, implemented and verified are different things.

## Planned experience (not yet implemented)

- A welcoming home dashboard showing current learning phase, next recommended activity and progress.
- Prerequisite-aware learning roadmap with expandable modules and topic detail views.
- Curated direct links to verified free visual and interactive learning resources.
- Checklist for learning activities; separate progress indicators for studying, exercises and understanding.
- Practical exercise instructions, reflection prompts and optional evidence links, without running experiments in Aethera.
- Personal notes and lightweight progress persistence; export/import and publication to GitHub for phone viewing.
- Polished responsive layout, accessible controls, touch-friendly mobile interactions, dark/light appearance.

**Every feature listed above is a requirement or proposal, not a working feature.** The exact behavior is subject to planning discussions.

## Learning sequence — draft, not a fixed deadline

We will refine phases, topics and dependencies in `docs/CURRICULUM.md`. Initial areas: foundations and math intuition; tokenization and embeddings; Transformer attention; generation and sampling; GPU/memory fundamentals; prefill and decode; KV cache; quantization; batching and serving/vLLM; RAG and evaluation; fine-tuning and LoRA/QLoRA; preference optimization/DPO; benchmarking and applied synthesis.

The earlier 14-week idea is a **baseline for topic coverage**, not a deadline or promise that the curriculum has been finalized.

## Initial resource bookmarks

These are research candidates, **not a fully audited curriculum**:

- [Forward Pass](https://forwardpass.dev/) — multiple interactive LLM guides.
- [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) — interactive Transformer and sampling exploration.
- [LLM Visualization](https://bbycroft.net/llm) — inspect and assess for appropriate learning tasks.
- [Inference Infrastructure animated tutorials](https://datasystem.school/inference-infrastructure-animated-tutorials/index.html) — animated infrastructure modules.
- [Inference Engineering Visual Guides](https://vizuaraai.github.io/inference-engineering-visual-guides/) — pending section-by-section assessment.

Resource links need relevant section-level review, mobile usability checks and a clear match to learning objectives before being presented as vetted recommendations.

## Intended technology (not chosen irrevocably)

Prefer modular **HTML, CSS, JavaScript, and structured JSON** on **GitHub Pages**. Use browser storage for editing on the laptop. Publishing changes for a phone to read requires an explicit export/publish mechanism; browser localStorage cannot be directly read by GitHub Actions. No framework will be added without a demonstrated benefit.

## Project documentation

| Document | Responsibility |
| --- | --- |
| [`docs/CURRICULUM.md`](docs/CURRICULUM.md) | Topics, prerequisites, learning outcomes, resource mapping and practical tasks |
| [`docs/TRACKER_SPEC.md`](docs/TRACKER_SPEC.md) | Dashboard content, behavior, progress semantics and user flows |
| [`docs/UI_UX.md`](docs/UI_UX.md) | Desktop/mobile layouts, interactions, accessibility and visual direction |
| [`docs/TECHNICAL_DESIGN.md`](docs/TECHNICAL_DESIGN.md) | Lightweight static architecture, data, storage and deployment decisions |
| [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) | Verified state, decisions pending, next actions and evidence |
| [`AGENTS.md`](AGENTS.md) | Development guardrails for Codex and other coding agents |

## Workflow

1. Agree on curriculum and specific resources in discussion.
2. Finalize progress behavior and UI/UX before coding.
3. Record approved changes in documentation and review them.
4. Ask Codex to implement one small documented milestone.
5. Test real browser behavior and update `PROJECT_STATUS.md` with evidence.
6. Deploy to GitHub Pages only when deployment is actually verified.

## Repository and hosting

This repository is named **Aethera**. GitHub Pages configuration and the published URL are **not yet verified**. Nothing here should be represented as deployed or functional.

## Privacy note

GitHub Pages on a public repository exposes published site assets. Do not commit private reflections, personal credentials, tokens, or sensitive notes. We must explicitly define what progress data may be published before implementing phone sync.

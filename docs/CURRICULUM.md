# Curriculum — Research Baseline

**Status:** Draft research plan, **not** an approved syllabus. Last revised: 2026-10-30.

## Purpose and learning approach

Aethera should guide a beginner-to-practical AI engineering journey using this sequence: **visualize → interact → understand → practice externally → explain observations → record progress**. The intent is depth and transferable engineering judgment, not merely checking boxes or rushing through a 14-week schedule.

## Topic record: required fields

Before a topic enters the app's authoritative curriculum dataset, provide:

- Stable topic ID and human-readable title; phase/module association.
- Plain-English reason to learn it; objectives written as observable abilities.
- Prerequisite IDs with short justification; core vs optional status.
- Terms and conceptual scope; explicitly excluded advanced details when relevant.
- Resource entries with title, exact **direct URL**, type (visual/interactive/read/video), free-access status, section/chapter, level, reason recommended, last review date, and verification state.
- Suggested sequence: visualize, interact, technical explanation, small practical, reflective question.
- External exercise: objective, prerequisites and hardware/API/cost constraints, instructions, expected observations (not fabricated outcomes), safe fallback when hardware unavailable.
- Completion rubric: what to explain, demonstrate or record; suggested next eligible topic.
- Optional estimated effort, explicitly nonbinding; notes and evidence slots.

## Candidate learning journey (subject to changes)

| Stage | Candidate modules | Key dependency / mastery question |
| --- | --- | --- |
| A. Basic mental model | 01 AI/ML/LLM overview; 02 tokens and embeddings | How does text become model-readable representations? |
| B. Transformer internals | 03 attention and Transformer blocks; 04 prediction and sampling | How does a model compute next-token probabilities? |
| C. Inference systems | 05 prefill/decode and KV cache; 06 GPU, memory, latency/throughput | Why do memory and batching influence inference performance? |
| D. Optimization and serving | 07 quantization; 08 batching, serving and vLLM | Which engineering tradeoffs change speed, quality and memory? |
| E. Knowledge-augmented systems | 09 embeddings/retrieval/RAG; 10 RAG evaluation | How do we measure retrieval usefulness and answer quality? |
| F. Adaptation and alignment | 11 fine-tuning/SFT; 12 LoRA/QLoRA; 13 preferences and DPO | When is adaptation justified, and what can we measure? |
| G. Integration | 14 benchmarking, evaluation, reporting and guided synthesis | Can I explain engineering tradeoffs with evidence? |

These are **candidate 14 modules**, not preapproved chapter boundaries. Some concepts recur; dependencies may require regrouping. The tracker must support non-linear exploration while highlighting prerequisites rather than hard-blocking curiosity.

## Candidate dependency graph

- 01 → 02 → 03 → 04.
- 03 + 04 → 05; 05 → 06 → 07/08 (07 and 08 may be studied in either order with the right foundations).
- 02 + basic model behavior → 09 → 10.
- 03 + conceptual training basics → 11 → 12 → 13.
- 07 + 08 + 10 + 12 → 14 (integration); prerequisites for the final module will be reassessed.

This graph is a **proposal for discussion**, not a validated learning dependency model.

## Resource inventory and verification status

| ID | Resource | Initial candidate mapping | Verification |
| --- | --- | --- | --- |
| R01 | https://forwardpass.dev/ | Tokens, attention, embeddings, training, quantization, inference | Homepage inspected 2026-10-30; individual chapter assignments not audited |
| R02 | https://poloclub.github.io/transformer-explainer/ | Transformer, Q/K/V, logits, temperature, top-k/top-p | Main page and its described interactive controls inspected 2026-10-30; exercises/mobile untested |
| R03 | https://bbycroft.net/llm | Transformer visualization | URL/title reachable in text inspection; detailed interactive content not verified |
| R04 | https://datasystem.school/inference-infrastructure-animated-tutorials/index.html | KV cache, batching, attention, GPU memory, serving | Index inspected 2026-10-30, lists 11 modules; deep links/interactions untested |
| R05 | https://vizuaraai.github.io/inference-engineering-visual-guides/ | Inference optimization and serving | Could not verify page content in this review; pending |

### Specific investigated sections (not yet approved as per-topic assignments)

- R01 index lists Inside the Transformer; Attention Mechanism; Embeddings; Tokenizer Training; Training & Fine-tuning; Quantization; Inference Engine; Architecture Explorer. Verify exact section destinations and accuracy before assigning them.
- R02 page describes tokenization, embeddings, Q/K/V, masked self-attention, output logits, temperature, top-k/top-p controls. These support a candidate interactive learning exercise; do not assume it teaches all Transformer variants.
- R04 index lists Foundation modules (LLMs/Transformers; Inference/KV Cache), batching and paging, FlashAttention, speculative decoding, prefill/decode disaggregation, cache management, and GPU/runtime appendices. Each subsection needs individual review.

## Example topic specification — draft illustration

**Topic ID:** `llm-transformer-attention`  
**Objective:** Explain intuitively why tokens attend to earlier tokens; identify query/key/value; describe masking and how attention contributes to next-token prediction.  
**Prerequisites:** tokenization, embeddings, elementary weighted-sum intuition.  
**Visual candidate:** R02 at its main page (section specific direct anchor pending).  
**Interact:** enter two short prompts and inspect how attention maps change; identify at least one observable difference.  
**Technical explanation:** trace embedding → Q/K/V → scores → masking/softmax → value mixture → output.  
**Practical:** record a diagram or annotated note; no model training required.  
**Reflection:** Why is causal masking needed? What is not captured by the analogy?  
**Completion:** explain the above in your own words and save a short observation; no self-reported benchmark.  
**Next:** prediction, logits and sampling.

## Resource selection rules

1. Prefer truly useful, free, accessible, visual explanations over volume of links.
2. Each topic gets one **best starting resource**, plus optional deeper technical/reference material. Do not overload cards.
3. Verify exact URL, relevant section, accessibility on mobile, availability and required login before recommending.
4. Do not embed third-party sites by default; use direct external links unless embedding is permitted and valuable.
5. Keep source attribution. Do not copy copyrighted course content into Aethera.
6. Costly hardware/Colab exercises are optional, clearly labeled, with no-cost conceptual alternative.

## Open curriculum decisions

- What assumed starting knowledge in Python, calculus, linear algebra, deep learning and systems should be required versus optional?
- Must RAG appear before or after inference optimization, or run as a parallel path?
- Should modules group around concepts or visual resource sequences?
- Exactly what evidence demonstrates understanding: typed reflection, self-assessment questions, explain-back checklist, optional link?
- How deep should vLLM internals, GPU architecture, fine-tuning maths and evaluation methods go?
- Should there be a final synthesis exercise, with no mandatory separate repo?

## Research and approval protocol

For each phase: inspect the actual free resources, map exact sections, write the prerequisite chain, choose a lightweight exercise, specify a realistic completion rubric, review with the user, then mark that phase **approved**. Until then, all mappings are preliminary. Never label an unverified resource as tested.

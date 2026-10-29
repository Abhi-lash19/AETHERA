# AI Engineering Curriculum

**Status:** Approved learning-path baseline (2026-10-30), now organized into modules for Aethera navigation. Resource controls, mobile compatibility and hardware exercises remain subject to real-world verification. Topic-based, with no deadline. Experiments happen outside Aethera.

## A. Learning goal

Learn to trace a decoder-only LLM from text to tokens, vectors, transformer operations, logits and generated text; distinguish training from inference; explain compute and memory costs; run and evaluate a small open-weight model; and reason about serving and adaptation choices. The learner already knows Python, backend/cloud engineering and practical RAG, so this path skips introductory API use and vector-search tutorials.

Use **Visualize → Interact → Understand → Practice → Explain observations → Complete**. Practice can be a simulation, diagram, small script or external experiment. A completion check is a self-assessment prompt, not independent certification. This curriculum builds engineering judgment, not professional GPU kernel or production infrastructure experience. Teaching-site performance figures are illustrations, not promised results.

## B. Curriculum overview

| Phase | Primary focus | Expected outcome | Main prerequisites | Status |
| --- | --- | --- | --- | --- |
| 1. Foundations | Weights, learning, tokens, vectors | Explain what is learned and what enters a model | Python, basic algebra intuition | Core |
| 2. Transformer | Blocks, attention, positions, generation | Trace a forward pass and next-token choice | Phase 1 | Core |
| 3. Inference | Prefill, decode, cache, context, latency | Explain workload-dependent inference cost | Phase 2 | Core |
| 4. Hardware and local models | CPU/GPU, memory, formats, quantization | Run a small model and choose a fitting format | Phases 2–3 | Core |
| 5. Serving | Batching, paging, runtimes, scheduling | Explain concurrent request handling | Phases 3–4 | Core |
| 6. Adaptation | SFT, LoRA/QLoRA, preferences | Choose and assess an adaptation path | Phases 1–4 | Core, GPU exercise optional |
| 7. Evidence | Evaluation, benchmarking, RAG, reliability | Defend a narrow engineering decision | Phases 4–6 | Core |

The 31 core topics form a suggested order, not a lock. Where hardware is unavailable, a conceptual check may be completed if honestly labeled; it never stands in for a hands-on experiment. `llm-transformer-attention` preserves the only explicit topic ID in the old draft. Other IDs are new proposals; the old numbered modules were stage labels, not persisted topic IDs. No existing progress is migrated.

### B.1. Module map for tracker navigation

**Approved grouping:** 14 modules across the seven existing phases. This is an organizational layer, not 14 additional lessons. Each existing topic belongs to exactly one module and retains its original stable ID and prerequisite rules.

| Phase | Module ID and title | Topics, in recommended order | Count |
| --- | --- | --- | ---: |
| 1 | `foundations-neural-computation`: **Neural Computation Basics** | `nn-weights-operations`, `nn-training-loop` | 2 |
| 1 | `foundations-text-representations`: **Tokens and Representations** | `llm-tokenization`, `llm-embeddings` | 2 |
| 2 | `transformer-attention-core`: **Transformer Structure and Attention** | `llm-transformer-block`, `llm-transformer-attention`, `llm-heads-positions` | 3 |
| 2 | `transformer-outputs-generation`: **From Transformer Blocks to Generation** | `llm-ffn-residual`, `llm-generation` | 2 |
| 3 | `inference-decoding-cache`: **Prefill, Decode and KV Cache** | `infer-prefill-decode`, `infer-kv-cache` | 2 |
| 3 | `inference-context-performance`: **Context Costs and Performance Metrics** | `infer-context-limits`, `infer-metrics` | 2 |
| 4 | `hardware-compute-memory`: **AI Hardware and Bottlenecks** | `hardware-cpu-gpu`, `hardware-roofline` | 2 |
| 4 | `local-models-quantization`: **Local Models and Quantization** | `local-model-choice`, `local-formats-quantization`, `local-quant-comparison` | 3 |
| 5 | `serving-batching-memory`: **Batching and KV Memory Management** | `serve-batching`, `serve-paged-kv` | 2 |
| 5 | `serving-runtimes-scheduling`: **Inference Runtimes and Scheduling** | `serve-runtimes`, `serve-scheduling` | 2 |
| 6 | `adaptation-foundations`: **Supervised Adaptation and Adapters** | `adapt-sft-data`, `adapt-lora-qlora` | 2 |
| 6 | `adaptation-trials-preferences`: **Adaptation Trials and Preferences** | `adapt-guided-trial`, `adapt-preferences-dpo` | 2 |
| 7 | `evidence-quality-benchmarks`: **Model Quality and Performance Evidence** | `eval-task-quality`, `eval-performance` | 2 |
| 7 | `evidence-reliability-decisions`: **Grounded Reliability and Engineering Choices** | `eval-rag-depth`, `eval-structured-reliability`, `eval-synthesis` | 3 |

**Module rules:** Module order follows the topic order in Section D. Topic links, learning objectives, resource verification states and practice instructions remain defined by their individual entries. Module membership is not a prerequisite and does not lock navigation. Module progress is calculated from member topics using the rules in `docs/TRACKER_SPEC.md`. Adding or changing a module must not erase progress associated with a stable topic ID.

## C. Topic dependency map

```text
Weights and training → tokens and embeddings → block and attention
Block and attention → logits/generation → prefill/decode → KV cache
Prefill/decode + hardware memory → local model → quantization → measurements
KV cache + measurements → batching → paging → runtime and scheduling
Training basics + local model → SFT data → LoRA/QLoRA → preferences
Local inference → baseline evaluation plan → adaptation trial → re-evaluation → decision record
```

Only IDs listed under **Prerequisites** are necessary for recommendation logic. The tracker should show prerequisite hints without hard locking exploration. Reuse one small model and a small private or synthetic task set through later phases. Record model revision, format, settings and hardware when comparing runs.

## D. Detailed topic roadmap

### Phase 1: Foundations

#### `nn-weights-operations`: Weights, activations and matrix operations
- **Why learn this?** Inference executes fixed learned weights on changing activations; this distinction grounds memory and compute reasoning.
- **Understand:** weights versus activations; linear layer as matrix multiplication; why a nonlinearity matters.
- **Prerequisites:** Basic algebra intuition.
- **Best visual resource:** [3Blue1Brown, But what is a Neural Network?](https://www.3blue1brown.com/lessons/neural-networks/) (animated video/text), which visualizes weights and layer outputs. Its digit classifier is an analogy.
- **Practical activity:** Multiply a two-input vector by a 2×2 weight matrix on paper or in Python; alter one weight. Free, CPU only.
- **Completion check:** Identify which values persist across requests and which depend on input.
- **Next topic:** `nn-training-loop`.

#### `nn-training-loop`: Loss, gradients and training versus inference
- **Why learn this?** Adaptation changes weights; ordinary generation does not.
- **Understand:** loss, gradient descent and backpropagation conceptually; train/eval modes; held-out data.
- **Prerequisites:** `nn-weights-operations`.
- **Best visual resource:** [3Blue1Brown, Gradient descent](https://www.3blue1brown.com/lessons/gradient-descent/) (animated video/text), for an intuitive moving loss surface.
- **Optional supporting resource:** [Inference Infrastructure, Overview of Training](https://datasystem.school/inference-infrastructure-animated-tutorials/m09-training.html), a visual pretraining-to-post-training map.
- **Practical activity:** Diagram one training step and one inference pass, marking gradients and updates. Free, no hardware.
- **Completion check:** Explain why a prompt at inference time does not itself update weights.
- **Next topic:** `llm-tokenization`.

#### `llm-tokenization`: Tokens, vocabularies and context
- **Why learn this?** Token boundaries determine sequence length, context use and generation granularity.
- **Understand:** text versus token IDs; subword/byte segmentation; special tokens and chat templates.
- **Prerequisites:** `nn-weights-operations`.
- **Best visual resource:** [Forward Pass, Inside the Transformer, chapter 1](https://www.forwardpass.dev/transformer) (browser tokenization playground). Select the Tokenization chapter; it shows text becoming IDs.
- **Practical activity:** Compare code, punctuation and multilingual text in the browser tokenizer; estimate effects on context. Free.
- **Completion check:** Explain why character count differs from token count and what a special token can signal.
- **Next topic:** `llm-embeddings`.

#### `llm-embeddings`: Token embeddings and hidden states
- **Why learn this?** Initial token vectors are learned lookups; later layers make them contextual, unlike standalone retrieval embeddings.
- **Understand:** embedding-table lookup; vector dimension; position information; token versus contextual versus sentence embedding.
- **Prerequisites:** `llm-tokenization`, `nn-weights-operations`.
- **Best visual resource:** [Transformer Explainer, Embedding section](https://poloclub.github.io/transformer-explainer/) (browser model visualization), showing token and position embeddings.
- **Practical activity:** Trace one token ID into a vector and sketch what later layers change. Free browser; live model may need a capable desktop browser.
- **Completion check:** Distinguish tokenizer ID, token vector and retrieval embedding.
- **Next topic:** `llm-transformer-block`.

### Phase 2: Transformer computation

#### `llm-transformer-block`: Decoder-only block and forward pass
- **Why learn this?** An inference runtime repeatedly executes this path, which explains behavior and cost.
- **Understand:** embedding → repeated blocks → output projection; attention versus feed-forward network (FFN); residual and normalization roles.
- **Prerequisites:** `llm-embeddings`.
- **Best visual resource:** [Forward Pass, Architecture Explorer](https://forwardpass.dev/architectures) (animated layer explorer). Compare GPT-2 with a displayed modern decoder.
- **Optional supporting resource:** [Brendan Bycroft, LLM Visualization](https://bbycroft.net/llm) (3D visualization; live walkthrough controls unverified here).
- **Practical activity:** Draw one decoder-only pass and mark which operations mix information across tokens. Free browser.
- **Completion check:** Trace the pass including FFN, residual path and output head.
- **Next topic:** `llm-transformer-attention`.

#### `llm-transformer-attention`: Causal self-attention
- **Why learn this?** Attention explains how earlier tokens affect a token and why context length costs grow.
- **Understand:** Q/K/V projections; scores, scaling, softmax and value mixing; causal mask.
- **Prerequisites:** `llm-transformer-block`.
- **Best visual resource:** [Transformer Explainer, Multi-Head Self-Attention section](https://poloclub.github.io/transformer-explainer/) (interactive attention maps and worked calculations) using small GPT-2.
- **Optional supporting resource:** [3Blue1Brown, Attention in transformers](https://www.3blue1brown.com/lessons/attention/) (animated Q/K/V intuition).
- **Practical activity:** Compare attention maps for two short prompts and calculate a two-token weighted sum. Free browser/paper.
- **Completion check:** Explain causal masking and what attention weights do, without treating them as a complete account of reasoning.
- **Next topic:** `llm-heads-positions`.

#### `llm-heads-positions`: Multiple heads, positions and GQA
- **Why learn this?** Architecture choices alter both representations and KV-cache size.
- **Understand:** head splitting; positional encoding and RoPE conceptually; multi-head versus grouped-query attention (GQA); query versus KV-head count.
- **Prerequisites:** `llm-transformer-attention`.
- **Best visual resource:** [Inference Infrastructure, LLMs and Transformers](https://datasystem.school/inference-infrastructure-animated-tutorials/m01-transformers.html) (step-through MHA/MQA/GQA figures), which link head layouts to KV memory.
- **Practical activity:** Compare displayed head layouts and calculate the ratio of KV-head counts with dimensions fixed. Free browser.
- **Completion check:** Explain why fewer KV heads reduce cache memory without removing query heads.
- **Next topic:** `llm-ffn-residual`.

#### `llm-ffn-residual`: FFN, normalization and residual path
- **Why learn this?** Attention is only part of a block; FFN weights and normalization matter to memory and training.
- **Understand:** token-wise FFN versus cross-token attention; nonlinear activation; residual addition; pre-norm/post-norm variants.
- **Prerequisites:** `llm-transformer-block`, `llm-transformer-attention`.
- **Best visual resource:** [Vizuara, Transformer Block Internals](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/25_transformer_block.html) (clickable block/forward-pass animation); parameter counts are illustrative.
- **Practical activity:** Annotate token-mixing and token-wise operations on a block diagram. Free browser.
- **Completion check:** Explain what the FFN contributes and why a residual path exists.
- **Next topic:** `llm-generation`.

#### `llm-generation`: Logits, sampling and autoregressive generation
- **Why learn this?** Decoding settings change output behavior while the model predicts one distribution per step.
- **Understand:** logits/softmax; greedy, temperature, top-k and top-p; feeding back chosen tokens; stopping.
- **Prerequisites:** `llm-tokenization`, `llm-transformer-attention`, `llm-ffn-residual`.
- **Best visual resource:** [Transformer Explainer, Output Probabilities and controls](https://poloclub.github.io/transformer-explainer/) (live GPT-2 with sampling inputs).
- **Practical activity:** Hold a prompt fixed and vary one sampling control at a time; note probability changes. Free browser.
- **Completion check:** Trace two generation steps and explain why lower temperature alone does not ensure factuality.
- **Next topic:** `infer-prefill-decode`.

### Phase 3: Inference mechanics

#### `infer-prefill-decode`: Prefill and decoding
- **Why learn this?** Prompt processing and generation stress different hardware resources.
- **Understand:** parallel prompt prefill; sequential decode; time to first token (TTFT); effects of input/output length.
- **Prerequisites:** `llm-generation`.
- **Best visual resource:** [Vizuara, Prefill vs Decode](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/03_prefill_vs_decode.html) (animated comparison and length sliders). Timelines are simulations, not measurements.
- **Practical activity:** Change input/output lengths, predict which phase grows, and sketch a timeline. Free browser.
- **Completion check:** Explain why long prompts and long responses have different bottlenecks.
- **Next topic:** `infer-kv-cache`.

#### `infer-kv-cache`: KV cache and reuse
- **Why learn this?** Caching avoids recomputation while consuming memory that grows with live tokens and requests.
- **Understand:** stored keys/values; cache creation and extension; avoided work; dependencies on layers, KV heads, context and batch.
- **Prerequisites:** `infer-prefill-decode`, `llm-heads-positions`.
- **Best visual resource:** [Inference Infrastructure, Inference and the KV Cache](https://datasystem.school/inference-infrastructure-animated-tutorials/m02-kvcache.html) (four step-through figures contrasting cached/uncached decode).
- **Practical activity:** Use the page's formula to estimate KV bytes for a hypothetical model, stating assumptions. Free calculator.
- **Completion check:** Explain how caching can improve latency yet reduce concurrency capacity.
- **Next topic:** `infer-context-limits`.

#### `infer-context-limits`: Context scaling and attention I/O
- **Why learn this?** Long contexts increase attention work, KV occupancy and memory movement.
- **Understand:** standard prefill score matrix; linear KV growth; work versus HBM traffic; FlashAttention tiling.
- **Prerequisites:** `llm-transformer-attention`, `infer-kv-cache`.
- **Best visual resource:** [Inference Infrastructure, I/O-Aware Kernels](https://datasystem.school/inference-infrastructure-animated-tutorials/m05-flashattention.html) (step-through tiling and memory figures), no kernel implementation needed.
- **Practical activity:** Sketch full-matrix versus tiled data movement for a short sequence. Free browser/paper.
- **Completion check:** Explain why FlashAttention does not make attention's arithmetic cost linear in context length.
- **Next topic:** `infer-metrics`.

#### `infer-metrics`: Latency and throughput
- **Why learn this?** An optimization matters only for a specified workload and metric.
- **Understand:** TTFT, inter-token delay and tokens/second; throughput versus request latency; warmup/repetition; prompt versus generation metrics.
- **Prerequisites:** `infer-prefill-decode`, `infer-kv-cache`.
- **Best visual resource:** [Vizuara, Prefill vs Decode, TTFT section](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/03_prefill_vs_decode.html) (interactive metric diagram; numbers illustrative).
- **Optional supporting resource:** [llama-bench documentation](https://github.com/ggml-org/llama.cpp/blob/master/tools/llama-bench/README.md) (official text defining prompt and generation tests).
- **Practical activity:** Draft a comparison sheet with model, device, token counts, warmup, repetitions and metrics. Free.
- **Completion check:** Name the metric for first response versus capacity and what `llama-bench` omits.
- **Next topic:** `hardware-cpu-gpu`.

### Phase 4: Hardware and local open-weight models

#### `hardware-cpu-gpu`: CPU, GPU and memory hierarchy
- **Why learn this?** Hardware placement constrains model size and performance.
- **Understand:** CPU latency versus GPU throughput orientation; compute units, RAM and VRAM/HBM; data movement.
- **Prerequisites:** `nn-weights-operations`, `infer-prefill-decode`.
- **Best visual resource:** [Inference Infrastructure, GPU Hardware](https://datasystem.school/inference-infrastructure-animated-tutorials/m10-hardware.html) (step-through GPU and memory animations). NVIDIA is an example, not a hardware requirement.
- **Practical activity:** Draw weights, activations and KV locations for CPU-only and GPU-loaded inference. Free.
- **Completion check:** Explain why capacity and bandwidth can dominate peak arithmetic throughput.
- **Next topic:** `hardware-roofline`.

#### `hardware-roofline`: Compute-bound versus memory-bound work
- **Why learn this?** Choose batching, smaller weights or faster compute according to the bottleneck.
- **Understand:** FLOPs, bytes and arithmetic intensity; roofline as an upper bound; batch effects.
- **Prerequisites:** `hardware-cpu-gpu`, `infer-prefill-decode`.
- **Best visual resource:** [Vizuara, Compute vs Memory Bound](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/07_compute_vs_memory_bound.html) (interactive roofline sliders). Hardware figures may age.
- **Practical activity:** Vary compute and bytes in the simulator; predict which optimization class helps. Free browser.
- **Completion check:** Give one bandwidth-bound and one compute-bound example with assumptions.
- **Next topic:** `local-model-choice`.

#### `local-model-choice`: Select and run a small open-weight model
- **Why learn this?** Architecture, license, tokenizer, context, format and device fit are real engineering inputs.
- **Understand:** parameters versus weight-memory estimate; base versus instruction model; model card/license; RAM/VRAM plus KV overhead.
- **Prerequisites:** `llm-generation`, `hardware-cpu-gpu`.
- **Best visual resource:** [Forward Pass, Architecture Explorer](https://forwardpass.dev/architectures) (animated architecture comparison), for inspecting component differences.
- **Optional supporting resource:** [llama.cpp, Obtaining models](https://github.com/ggml-org/llama.cpp/blob/master/docs/models.md) (official GGUF/CLI guide).
- **Practical activity:** Inspect a current model card/license, then run a small legal GGUF instruction model with `llama.cpp` on CPU or available accelerator. No API fee; RAM, disk and download required. Fallback: calculate fit from model cards without downloading.
- **Completion check:** Record model/revision, format, device and context; explain fit.
- **Next topic:** `local-formats-quantization`.

#### `local-formats-quantization`: Formats and quantized numbers
- **Why learn this?** Packaging and numeric precision shape compatibility, memory and quality.
- **Understand:** GGUF versus framework checkpoint; FP16/BF16 versus low-bit weights; rounding/scale error; weight versus KV/activation memory.
- **Prerequisites:** `local-model-choice`, `hardware-roofline`.
- **Best visual resource:** [Vizuara, Quantization Number Formats](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/19_quantization_formats.html) (interactive bit layouts and number converter). Toy converter is not a model-quality predictor.
- **Optional supporting resource:** [Forward Pass, Quantization](https://forwardpass.dev/quantization) (animated method/tradeoff chapters; displayed prices are not quotations).
- **Practical activity:** Enter an outlier and a small value; estimate weights-only storage at two precisions. Free browser/calculator.
- **Completion check:** Explain why fewer bits need not always improve speed or preserve task quality.
- **Next topic:** `local-quant-comparison`.

#### `local-quant-comparison`: Compare quantization choices
- **Why learn this?** Bit width alone cannot settle fit, speed or quality for a real workload.
- **Understand:** weight-only versus weight-and-activation quantization; model-specific sensitivity; controlled comparisons.
- **Prerequisites:** `local-formats-quantization`, `infer-metrics`.
- **Best visual resource:** [Forward Pass, Quantization, chapter 5](https://forwardpass.dev/quantization) (browser chapter controls for quality/size/speed). Treat as a hypothesis, not benchmark evidence.
- **Practical activity:** If two GGUF variants fit, use identical prompts/settings and record file size, RAM, prompt/generation speed and output differences. Free local compute. Fallback: compare sizes and memory estimates without asserting quality/speed.
- **Completion check:** Make one evidence-backed format choice and state what it cannot establish.
- **Next topic:** `serve-batching`.

### Phase 5: Inference engines and serving

#### `serve-batching`: Static and continuous batching
- **Why learn this?** Concurrent requests make generation a scheduling problem.
- **Understand:** padding and idle slots; iteration-level admission; throughput/latency tradeoff; queueing.
- **Prerequisites:** `infer-prefill-decode`, `infer-metrics`.
- **Best visual resource:** [Inference Infrastructure, Batching, Scheduling and Paging](https://datasystem.school/inference-infrastructure-animated-tutorials/m04-batching.html) (step-through request lanes), starting with static/continuous batching.
- **Practical activity:** Step through different-length requests and count idle slots. Free browser.
- **Completion check:** Explain why continuous batching helps and how contention can still hurt latency.
- **Next topic:** `serve-paged-kv`.

#### `serve-paged-kv`: Paged KV memory and prefix reuse
- **Why learn this?** Serving capacity depends on allocating growing caches across requests.
- **Understand:** logical-to-physical blocks; fragmentation; sharing/copy-on-write; prefix-cache benefit and occupancy cost.
- **Prerequisites:** `infer-kv-cache`, `serve-batching`.
- **Best visual resource:** [Inference Infrastructure, Batching, Scheduling and Paging](https://datasystem.school/inference-infrastructure-animated-tutorials/m04-batching.html) (step-through PagedAttention and sharing figures).
- **Optional supporting resource:** [KV Cache Management and Offload](https://datasystem.school/inference-infrastructure-animated-tutorials/m08-kvoffload.html) for cross-request reuse.
- **Practical activity:** Map two shared-prefix sequences to logical/physical blocks and show a copy-on-write point. Free.
- **Completion check:** Explain how paging avoids wasted reservation without shrinking stored KV.
- **Next topic:** `serve-runtimes`.

#### `serve-runtimes`: Runtime and vLLM anatomy
- **Why learn this?** Engines combine model loading, scheduling, kernels, KV management and an API.
- **Understand:** scheduler/worker/KV manager responsibilities; vLLM batching/paging; `llama.cpp` versus vLLM/SGLang roles.
- **Prerequisites:** `serve-paged-kv`.
- **Recommended prior learning:** `local-model-choice` for comparing a runtime with a real local setup.
- **Best visual resource:** [Inference Infrastructure, Inference Runtimes](https://datasystem.school/inference-infrastructure-animated-tutorials/m11-runtimes.html) (animated serving stack). Consult current docs for exact support.
- **Optional supporting resource:** [vLLM hardware/installation](https://docs.vllm.ai/en/stable/getting_started/installation/) (official text).
- **Practical activity:** Compare a local `llama.cpp` setup with conceptual vLLM components. Optional vLLM trial only on compatible hardware; no GPU required for completion and free notebook GPU access is uncertain.
- **Completion check:** Locate request admission and KV allocation; give one reason to choose each runtime.
- **Next topic:** `serve-scheduling`.

#### `serve-scheduling`: Prefill interference and serving policy
- **Why learn this?** Long prompts can stall ongoing decodes even when overall throughput looks good.
- **Understand:** prefill/decode interference; chunked prefill; TTFT versus inter-token goals; disaggregation costs.
- **Prerequisites:** `serve-batching`, `infer-prefill-decode`.
- **Recommended prior learning:** `serve-runtimes` for placement decisions.
- **Best visual resource:** [Inference Infrastructure, Prefill-Decode Scheduling](https://datasystem.school/inference-infrastructure-animated-tutorials/m07-disaggregation.html) (step-through timelines; no universally winning policy).
- **Practical activity:** Schedule one long new prompt alongside two decodes under two policies. Free paper/browser.
- **Completion check:** State a latency/throughput tradeoff and the cost of separate prefill/decode pools.
- **Next topic:** `adapt-sft-data`.

### Phase 6: Model adaptation

#### `adapt-sft-data`: Pretraining, SFT and adaptation data
- **Why learn this?** Fine-tuning needs a defined behavior, suitable examples and evaluation target.
- **Understand:** pretraining versus supervised fine-tuning (SFT); prompt/response data and chat templates; train/validation split; when prompting or RAG is preferable.
- **Prerequisites:** `nn-training-loop`, `llm-generation`.
- **Recommended prior learning:** `local-model-choice` before selecting a model for an experiment.
- **Best visual resource:** [Inference Infrastructure, Overview of Training](https://datasystem.school/inference-infrastructure-animated-tutorials/m09-training.html) (step-through pretraining/SFT/preference pipeline).
- **Optional supporting resource:** [TRL SFT Trainer](https://huggingface.co/docs/trl/sft_trainer) (official text on formats/loss).
- **Practical activity:** Specify one narrow behavior and draft synthetic train/held-out examples; identify leakage. Free.
- **Completion check:** Explain what SFT changes and why the test split must stay separate.
- **Next topic:** `adapt-lora-qlora`.

#### `adapt-lora-qlora`: LoRA and QLoRA mechanics
- **Why learn this?** Adapters train fewer parameters; a quantized frozen base reduces training memory.
- **Understand:** frozen base plus low-rank update; rank; QLoRA; training memory beyond weights.
- **Prerequisites:** `adapt-sft-data`, `local-formats-quantization`.
- **Best visual resource:** [Inference Infrastructure, Overview of Training, LoRA figure](https://datasystem.school/inference-infrastructure-animated-tutorials/m09-training.html) (five-step animation and QLoRA note).
- **Optional supporting resource:** [Hugging Face PEFT, LoRA](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora) (official mechanism).
- **Practical activity:** Sketch `W + AB`, mark trained/frozen parts, and estimate adapter parameters for two ranks. Free calculator.
- **Completion check:** Explain why QLoRA is a training setup, not just running 4-bit inference.
- **Next topic:** `adapt-guided-trial`.

#### `adapt-guided-trial`: Guided adaptation and baseline
- **Why learn this?** A fine-tuning claim needs held-out comparison with a baseline.
- **Understand:** a held-out baseline and evaluation rubric; adapter artifact; overfitting and formatting failures; hardware/data constraints.
- **Prerequisites:** `adapt-sft-data`, `adapt-lora-qlora`.
- **Recommended prior learning:** Preview the rubric in `eval-task-quality` before the trial; this later topic is not a gate.
- **Best visual resource:** [Hugging Face LLM Course, Fine-Tuning with SFTTrainer](https://huggingface.co/learn/llm-course/en/chapter11/3) (public illustrated guide with training steps, monitoring and a quiz, not a live training simulation). This direct section is more useful for the trial than the course introduction.
- **Practical activity:** **Baseline → Adaptation → Re-evaluation → Engineering conclusion.** First define a held-out task set, scoring rubric and baseline evaluation plan using `eval-task-quality` concepts. If compatible hardware is available, record original-model results, run a small LoRA/QLoRA adaptation, test the adapted model on the same held-out cases and settings, then explain differences and limits. A free notebook GPU may be unavailable; check quota, model license and memory before running. Without hardware, inspect the workflow and write an explicitly unexecuted plan and comparison table.
- **Completion check:** **Conceptual completion:** Explain the data split, baseline, training, re-evaluation and adaptation decision; label all planned results unmeasured. **Hands-on completion (optional without compatible hardware):** Show an actual adapter run, original and adapted model results on the same held-out set, and an engineering conclusion. A plan alone never counts as a completed experiment.
- **Next topic:** `adapt-preferences-dpo`.

#### `adapt-preferences-dpo`: Preference data and DPO
- **Why learn this?** Preference optimization uses comparative quality labels after SFT.
- **Understand:** prompt/chosen/rejected triples; reference policy and DPO concept; contrast with reward-model RLHF; label bias.
- **Prerequisites:** `adapt-sft-data`.
- **Recommended prior learning:** `adapt-lora-qlora` for a later parameter-efficient DPO run.
- **Best visual resource:** [Forward Pass, Training and Fine-tuning, chapter 5](https://forwardpass.dev/training) (browser DPO guide; RLHF in chapter 3 gives context).
- **Optional supporting resource:** [TRL DPO Trainer](https://huggingface.co/docs/trl/main/dpo_trainer) (official preference format; `main` may require source install).
- **Practical activity:** Draft three preference pairs and find an ambiguous label. Free; training optional/advanced.
- **Completion check:** Explain what pairwise labels add beyond SFT and what a bad pair teaches.
- **Next topic:** `eval-task-quality`.

### Phase 7: Evidence and applied engineering

#### `eval-task-quality`: Task-specific quality evaluation
- **Why learn this?** Generic benchmarks rarely answer whether a model meets a particular use case.
- **Understand:** task set/rubric; held-out cases and leakage; human versus model judge; paired comparison and failure categories.
- **Prerequisites:** `llm-generation`.
- **Recommended prior learning:** `local-model-choice` for a local comparison; `adapt-sft-data` only when evaluating an adapted model.
- **Best visual resource:** [Forward Pass, Training and Fine-tuning, chapter 6](https://forwardpass.dev/training) (browser evaluation guide). Use a separate rubric for evidence.
- **Optional supporting resource:** [EleutherAI LM Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness) (official standard-task CLI).
- **Practical activity:** Create a small private/synthetic held-out set and manually score two variants. Free if a local model runs; fallback: design and review rubric.
- **Completion check:** Categorize failures and state the limits of a small sample.
- **Next topic:** `eval-performance`.

#### `eval-performance`: Reproducible benchmarking
- **Why learn this?** Speed and memory tuning require a defined workload.
- **Understand:** warmup/repetition; fixed model/prompt/settings; prompt versus generation rate; latency percentiles and concurrency.
- **Prerequisites:** `infer-metrics`.
- **Recommended prior learning:** `local-model-choice` for a runnable benchmark; `local-quant-comparison` or `serve-batching` when comparing those configurations.
- **Best visual resource:** [Vizuara, Prefill vs Decode timeline](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/03_prefill_vs_decode.html) (interactive metric intuition, not measured data).
- **Optional supporting resource:** [llama-bench guide](https://github.com/ggml-org/llama.cpp/blob/master/tools/llama-bench/README.md) (official tests/exclusions).
- **Practical activity:** Repeat local prompt-processing/generation tests with setup and variation recorded. Free CPU acceptable. Fallback: unexecuted protocol. TTFT needs separate end-to-end timing.
- **Completion check:** Present results with units/setup/limits, or clearly label a protocol unexecuted.
- **Next topic:** `eval-rag-depth`.

#### `eval-rag-depth`: Retrieval quality and grounded answers
- **Why learn this?** Existing RAG experience benefits from separating retrieval failures from answer failures and comparing adaptation.
- **Understand:** relevance versus faithfulness; missing evidence versus misuse; context/latency cost; RAG versus SFT remedies.
- **Prerequisites:** `eval-task-quality`.
- **Recommended prior learning:** `infer-context-limits` when investigating context-budget costs.
- **Best visual resource:** [RAGAS, Context Precision](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/) (worked text metric guide). Retained because no verified interactive visual covered both retrieval quality and answer faithfulness at this depth; the visual candidate in the register could not be audited beyond its index.
- **Practical activity:** Reuse an existing RAG pipeline or paper example; manually mark relevant chunks and answer support for a few queries. Free, no judge API.
- **Completion check:** Diagnose one retrieval and one generation failure with different remedies.
- **Next topic:** `eval-structured-reliability`.

#### `eval-structured-reliability`: Structured output, tools and reliability
- **Why learn this?** Valid syntax differs from correct tool choice, arguments and content.
- **Understand:** constrained decoding and token masking; tool call versus execution; validation, retry and semantic checks.
- **Prerequisites:** `llm-generation`.
- **Recommended prior learning:** `eval-task-quality` for testing semantic correctness.
- **Best visual resource:** [Vizuara, Structured Output and Logit Biasing](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/29_structured_output.html) (token-mask and grammar-state walkthrough). Ignore fixed overhead/perfect-reliability claims as empirical guarantees.
- **Practical activity:** Define a JSON schema and three syntactically valid but operationally wrong outputs; optionally test a local engine. Free.
- **Completion check:** Explain what constrained decoding guarantees and what application validation still must check.
- **Next topic:** `eval-synthesis`.

#### `eval-synthesis`: Engineering decision record
- **Why learn this?** The final skill is choosing feasible model, runtime and adaptation/evaluation strategies under constraints.
- **Understand:** quality/latency/memory/cost; evidence versus assumptions; license/privacy; baseline-to-improvement path.
- **Prerequisites:** `eval-task-quality`, `eval-performance`, `eval-rag-depth`, `eval-structured-reliability`, `serve-runtimes`.
- **Best visual resource:** [Inference Infrastructure, Inference Runtimes](https://datasystem.school/inference-infrastructure-animated-tutorials/m11-runtimes.html) (animated stack recap connecting scheduler, KV, weights and streaming).
- **Practical activity:** Write a one-page choice for a narrow use case, using measurements if available and labeling untested assumptions. No repo/deployment/paid API required.
- **Completion check:** Defend a choice with evidence and limitations; name the next test that could change it.
- **Next topic:** An optional deep dive or weak prerequisite.

## E. Optional deep dives

| Topic | Why later |
| --- | --- |
| [Speculative decoding](https://datasystem.school/inference-infrastructure-animated-tutorials/m06-speculative.html), [prefix caching/offload](https://datasystem.school/inference-infrastructure-animated-tutorials/m08-kvoffload.html) | Useful for latency and repeated-prefix workloads. |
| [MoE, sparse attention and long context](https://forwardpass.dev/attention) | Model-specific routing and context tradeoffs after dense Transformers. |
| FlashAttention kernel implementation and profiling | Deepen I/O reasoning when kernel optimization is an actual task; not core. |
| [Tensor/pipeline parallelism](https://datasystem.school/inference-infrastructure-animated-tutorials/m03-sharding.html) | Relevant when one device cannot fit the model or traffic. |
| Distillation, reward modeling, RLHF/GRPO | Specialized post-training. DPO concepts suffice for core. |
| Multimodal inference and distributed operations | Pursue for a concrete use case; real operations require real systems. |

## F. Resource verification register

**Verified** means a direct public page and relevant content were inspected through web text/search on 2026-10-30. Visible/documented controls establish the stated resource type, but were **not manually exercised**. No mobile, keyboard, account, download, model run, notebook quota or benchmark was tested. Recheck links and compatibility before tracker publication.

| Resource and researched sections | Status/type | Access and limitations |
| --- | --- | --- |
| [Forward Pass Transformer](https://www.forwardpass.dev/transformer), [attention](https://forwardpass.dev/attention), [training](https://forwardpass.dev/training), [quantization](https://forwardpass.dev/quantization), [inference engine](https://forwardpass.dev/inference-engine), [architecture explorer](https://forwardpass.dev/architectures) | **Verified**, public browser guides/animations; no API key advertised | Named chapters share one URL and require navigation. Some prices/performance are illustrative or time-sensitive. Mobile untested. [Embeddings](https://forwardpass.dev/embeddings) and [tokenizer training](https://forwardpass.dev/tokenizer-training) were indexed but direct fetch failed: **UNVERIFIED**, not primary recommendations. |
| [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) | **Verified**, public live GPT-2 visualization and controls | 124M GPT-2 is older and intentionally small; browser compute and mobile untested. |
| [Bycroft LLM Visualization](https://bbycroft.net/llm), [source](https://github.com/bbycroft/llm-viz) | **Partially verified**, 3D project and URL/title; live steps **UNVERIFIED** | Public; text extraction exposed only title, so optional support only. Mobile/WebGL behavior untested. |
| [Inference Infrastructure index](https://datasystem.school/inference-infrastructure-animated-tutorials/index.html), [transformers](https://datasystem.school/inference-infrastructure-animated-tutorials/m01-transformers.html), [KV](https://datasystem.school/inference-infrastructure-animated-tutorials/m02-kvcache.html), [batching/paging](https://datasystem.school/inference-infrastructure-animated-tutorials/m04-batching.html), [FlashAttention](https://datasystem.school/inference-infrastructure-animated-tutorials/m05-flashattention.html), [scheduling](https://datasystem.school/inference-infrastructure-animated-tutorials/m07-disaggregation.html), [offload](https://datasystem.school/inference-infrastructure-animated-tutorials/m08-kvoffload.html), [training](https://datasystem.school/inference-infrastructure-animated-tutorials/m09-training.html), [GPU](https://datasystem.school/inference-infrastructure-animated-tutorials/m10-hardware.html), [runtimes](https://datasystem.school/inference-infrastructure-animated-tutorials/m11-runtimes.html) | **Verified**, public step/auto-play modules; some direct fetches failed transiently but indexed content matched the index | No account/dependency advertised. Conceptual figures, not benchmarks; controls/mobile untested. |
| [Vizuara index](https://vizuaraai.github.io/inference-engineering-visual-guides/), [prefill](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/03_prefill_vs_decode.html), [roofline](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/07_compute_vs_memory_bound.html), [formats](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/19_quantization_formats.html), [block](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/25_transformer_block.html), [structured output](https://vizuaraai.github.io/inference-engineering-visual-guides/visual_walkthroughs/29_structured_output.html) | **Verified via indexed direct pages**, public visual guides; index fetch failed in web tool | Some fixed performance/quality claims are oversimplified or time-sensitive. Listed Colab labs not run; free GPU quota uncertain. Mobile/control behavior untested. |
| [3Blue1Brown neural networks](https://www.3blue1brown.com/lessons/neural-networks/), [gradient descent](https://www.3blue1brown.com/lessons/gradient-descent/), [attention](https://www.3blue1brown.com/lessons/attention/) | **Verified**, public animated video/text | Passive video, simplified examples; mobile playback untested. |
| [llama.cpp models](https://github.com/ggml-org/llama.cpp/blob/master/docs/models.md), [benchmarking](https://github.com/ggml-org/llama.cpp/blob/master/tools/llama-bench/README.md) | **Verified**, official text/runnable CLI | Free source; model license, download, RAM and disk must be checked. Benchmark excludes tokenization/sampling. No command run. |
| [Hugging Face SFT course introduction](https://huggingface.co/learn/llm-course/en/chapter11/1), [direct SFTTrainer section](https://huggingface.co/learn/llm-course/en/chapter11/3), [TRL SFT](https://huggingface.co/docs/trl/sft_trainer), [PEFT LoRA](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora), [TRL DPO](https://huggingface.co/docs/trl/main/dpo_trainer), [vLLM installation](https://docs.vllm.ai/en/stable/getting_started/installation/) | **Verified**, public official tutorials/docs, mostly text; SFTTrainer section includes illustrations and quiz | Direct SFTTrainer section covers dataset, training configuration, monitoring and post-training evaluation, but does not supply the required pre-training baseline comparison. Actual runs need compatible hardware/packages; free notebook access contingent. `main` docs may differ from installed stable versions. No installation. |
| [RAGAS Context Precision](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/), [LM Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness) | **Verified**, public text/open-source tools | Automated judges may need a model/API and have label errors; manual rubric is free. No evaluation run. |
| [RAG Evaluation Lab index](https://rag-evaluation.futureproofindia.com/), [Unravel RAG Visualizer](https://github.com/jvorndran/RAG-Visualizer) | **Investigated, not assigned** | Lab index describes visual faithfulness and context-quality lessons, but direct lesson fetches failed, so lesson content/controls remain **UNVERIFIED**. Unravel documents local interactive retrieval comparison, but requires local setup and does not cover answer faithfulness as directly as this topic needs. Mobile behavior untested. |
| [MLCIV LoRA/QLoRA notebook](https://mlciv.com/nlp-notebooks/notebooks/hw5/Part1-sft_trl_lora_qlora/) | **Investigated, not assigned**; public notebook-style tutorial | Offers a training workflow, but uses Hugging Face login and a Colab GPU, with no verified baseline-before-training comparison. Free GPU availability is contingent. It is not a clearer visual primary than the existing course sequence. |

## G. Approved scope and remaining learning logistics

### Approved

1. The learning path has **seven phases, 14 navigation modules and 31 core topics**, with optional deep dives and no deadline.
2. Advanced RAG quality evaluation stays core because it extends previous RAG implementation experience into defensible evaluation.
3. Conceptual learning is distinct from an actual model adaptation run. A baseline/evaluation plan can demonstrate understanding, but never counts as a completed training experiment.
4. Aethera may store independent study checkboxes, self-assessed understanding, exercise statuses, optional notes/questions/review flags and optional evidence links as defined in `docs/TRACKER_SPEC.md`.
5. Essential prerequisites guide recommended next topics but do not prohibit exploration.

### Still subject to verification or later planning

- The user's available CPU RAM, GPU/VRAM, storage and willingness to use contingent free notebook GPU sessions must be checked before specifying an executable model adaptation trial.
- Resource links and described page controls were investigated at drafting time, but have not been comprehensively tested on mobile or against all required interactive behaviors.
- Exact presentation of modules and topic details belongs in `docs/UI_UX.md`; it does not change the curriculum itself.

**Approval boundary:** These are approved learning-structure decisions, not verification that any exercises have run or that the tracker has been implemented.

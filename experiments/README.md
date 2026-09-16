# Eve onboarding benchmark

This is a deliberately small, visual first experiment for comparing how two Eve configurations reason about the same product problem.

## What is being tested?

Both agents receive the same React application, product evidence, frozen prompt, tools and workspace. In the first comparison, change only the model. Do not enable cross-agent critique or self-modification yet.

The app intentionally represents a plausible but high-friction onboarding flow. The task is intentionally not a six-bug scavenger hunt: the agent must interpret product evidence and decide what focused change to make.

## Run it locally

From `benchmark/onboarding`:

```bash
npm install
npm run dev
```

Open the local Vite URL and complete the current onboarding yourself before running an agent. Read `product-evidence.md` and form your own view of the problem.

## Baseline experiment

1. Create a clean copy/branch from this frozen fixture for Agent A.
2. Start a fresh Eve session with Model A.
3. Give it the exact contents of `experiments/onboarding-prompt.md`.
4. Save the final diff, response, trace/telemetry and screenshots.
5. Reset to the frozen fixture.
6. Repeat with Model B, changing only the model.
7. Compare the two implementations side by side.

Do not show either agent the other agent's solution during the baseline.

## What to record

Record model ID, Eve version, reasoning setting, duration, input/output tokens and cost where available, tool/model call counts, files changed, diff size, final verification commands, and the agent's stated diagnosis/hypothesis.

Keep correctness/product observations separate from efficiency telemetry.

## Human-readable comparison

For this first experiment, inspect whether each solution:

- allows creation with only a workspace name;
- makes optional questions genuinely optional;
- keeps marketing consent optional;
- preserves persistence;
- remains keyboard/mobile usable;
- responds to the supplied funnel and feedback rather than performing an unrelated redesign;
- explains a coherent product hypothesis;
- avoids unnecessary dependencies and scope expansion.

The purpose of v1 is to understand agent behaviour, not manufacture a single winner score.

## Phase two

Only after the baseline is repeatable: give one model an anonymised summary of the other model's approach/failures and ask it to propose a narrowly scoped improvement. Apply that change on a new branch and rerun the untouched baseline plus a holdout task. This keeps cross-improvement separate from the initial model comparison.

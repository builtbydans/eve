# Frozen prompt — onboarding benchmark v1

You are working in a small React/TypeScript SaaS onboarding experience for a fictional product called Northstar.

Product analytics show that only 18.1% of users who reach onboarding complete it. The repository contains `product-evidence.md` with the funnel, user feedback, and product constraints.

Your goal is to investigate the experience and make a focused product-engineering improvement that you believe will materially reduce unnecessary friction while preserving the existing visual language.

Requirements:
- Read the existing implementation and product evidence before editing.
- Keep workspace-name persistence working; a workspace name is the only information required to create a workspace.
- Company size and industry may still be collected, but they are not required for creation.
- Marketing consent must remain optional.
- Do not add a backend, external service, analytics SDK, or new product dependency solely to solve the task.
- Keep the implementation accessible and usable on desktop and mobile.
- Do not modify the benchmark prompt or product-evidence fixture.
- Keep the change focused rather than redesigning the entire application.

Before finishing, run the available test, typecheck, lint, and build commands and fix any failures caused by your changes.

Return a concise summary containing:
1. your diagnosis of the main onboarding problem,
2. the product hypothesis behind your changes,
3. the files you changed,
4. the verification you ran.

Do not optimise for a hidden rubric. Treat this as a real product-engineering task and make the smallest set of changes you believe best addresses the evidence.
# Development Log

## Day 1 — 2026-05-01
**Hours worked:** 4
**What I did:** Initialized the project structure. Set up the Express backend, MongoDB connection, and basic folder scaffolding (controllers, routes, services).
**What I learned:** Mongoose 8 handles connections slightly differently, requiring updated syntax for strict queries.
**Blockers / what I'm stuck on:** Deciding how granular the tool tracking should be in the DB schema.
**Plan for tomorrow:** Build the core Audit Engine logic.

## Day 2 — 2026-05-02
**Hours worked:** 5
**What I did:** Implemented the `auditEngine.js` with deterministic business rules. Wrote Jest tests to ensure the math for downgrading Enterprise plans works correctly.
**What I learned:** Testing pure functions is incredibly satisfying and highlights edge cases (like dividing by zero seats).
**Blockers / what I'm stuck on:** None today.
**Plan for tomorrow:** Integrate Groq API for the summary generation.

## Day 3 — 2026-05-03
**Hours worked:** 4.5
**What I did:** Integrated `groq-sdk` and built the prompt for the summary API. Implemented fallback handling if the Groq API times out.
**What I learned:** Groq's Llama 3 model is blazing fast, but prompt engineering for concise 100-word summaries requires strict system instructions.
**Blockers / what I'm stuck on:** The Groq `llama3-8b-8192` model got decommissioned, causing 400 errors.
**Plan for tomorrow:** Fix the Groq model issue, finish the frontend connection, and start Lead Capture.

## Day 4 — 2026-05-04
**Hours worked:** 6
**What I did:** Swapped Groq model to `llama-3.1-8b-instant`. Built the React frontend forms and connected them to the API. Fixed CORS issues.
**What I learned:** Vite uses different environment variable syntax (`VITE_` prefix) compared to Create React App.
**Blockers / what I'm stuck on:** Radix UI Dialog accessibility warnings on the frontend.
**Plan for tomorrow:** Polish frontend UI, fix Radix warnings, and finalize the lead capture endpoint.

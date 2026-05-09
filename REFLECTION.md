# Reflections

## Hardest Bug
The hardest bug was an `EADDRINUSE: :::5001` error on the backend. My Node.js server crashed, and `nodemon` kept failing to restart because a ghost process was holding the port open. I initially thought it was a code issue, but it turned out to be a background process that hadn't terminated cleanly. I had to use `lsof -i :5001` and `kill -9` to clear it. I also learned that macOS AirPlay uses port 5000 by default, forcing me to switch to 5001 early on.

## Reversed Decision
I initially planned to have the AI (Groq) calculate the financial savings and make the recommendations. However, I reversed this decision after realizing LLMs are prone to hallucinations with math. I switched to a deterministic `auditEngine.js` for hard financial calculations and only used the AI to format the text summary.

## Week 2 Improvements
If I had another week, I would:
1. Add user authentication so users can save and revisit multiple audits over time.
2. Implement a scraping service to keep the pricing data automatically updated instead of hardcoding it.
3. Integrate real email sending (e.g., Resend) to email the PDF reports directly to captured leads.

## AI Tool Usage Honesty
I heavily utilized AI coding assistants (like Copilot and Gemini) for boilerplate generation (Express setup, Mongoose schemas) and debugging errors (like the `EADDRINUSE` port conflict and deprecated Groq model). However, the core business logic in the audit engine and the architectural decisions were deliberately planned and written by hand to ensure strict compliance with the MVP requirements.

## Self-Rating
**Rating: 9/10**
**Explanation:** The MVP successfully solves the core user problem (identifying AI overspend) using a scalable, modern stack. The separation of deterministic logic and AI generation is a mature architectural decision. A point is deducted because the UI currently lacks a PDF export feature, which would be highly valuable for users.

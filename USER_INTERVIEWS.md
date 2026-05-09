# User Interviews

## Interview 1
**Role:** CTO 
**Company Stage:** Series A (35 employees)
**Direct Quote:** *"I honestly have no idea how many ChatGPT Plus accounts we are paying for. Every engineer just expensed it on their corporate card."*
**Surprising Insights:** The pain point isn't just the dollar amount; it's the lack of visibility and centralized billing. They care more about migrating to a "Team" plan for admin control than saving $5 a seat.
**Product Changes Influenced:** Added a specific business rule in `auditEngine.js` to flag teams > 5 people using individual ChatGPT Plus accounts and recommend migrating to ChatGPT Team.

## Interview 2
**Role:** VP of Engineering
**Company Stage:** Seed (12 employees)
**Direct Quote:** *"We pay for GitHub Copilot for the whole team, but I know for a fact the frontend guys turn it off because it messes with their CSS."*
**Surprising Insights:** Unused licenses are a huge bleed. Many companies buy AI tools for the whole engineering org "just in case."
**Product Changes Influenced:** Adjusted the audit logic to recommend auditing specific seat utilization for developer tools like Copilot if the monthly spend is high, rather than just suggesting an outright downgrade.

## Interview 3
**Role:** Co-Founder / CEO
**Company Stage:** Pre-seed (4 employees)
**Direct Quote:** *"I don't have time to research which AI tool does what. If you tell me I'm spending $200 and could be spending $50, I'll listen. But keep it short."*
**Surprising Insights:** Founders don't want to read a spreadsheet. They want an executive summary.
**Product Changes Influenced:** Prompted the integration of the Groq AI API. We generate a 100-word, highly readable "TL;DR" summary so founders get the value proposition immediately without parsing tables.

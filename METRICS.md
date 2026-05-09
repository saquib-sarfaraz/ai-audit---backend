# Metrics

## North Star Metric
**Total Identified Annual Savings ($)**
- *Why:* This perfectly aligns customer value with our product's core utility. The more money we help startups "find," the more valuable our tool becomes.

## Supporting Metrics
1. **Audits Completed (Weekly):** Top-of-funnel engagement metric. Shows how many users are actually filling out the tool form.
2. **Lead Conversion Rate (%):** The percentage of users who complete an audit and successfully submit their email to "unlock full insights" or get the PDF sent to them.
3. **Report Share Rate:** How often the `/report/:id` URL is visited by an IP address different from the creator. Measures virality.

## Instrumentation Strategy
- **Frontend:** PostHog or Amplitude for tracking form step drop-offs. (e.g., Are users abandoning the form when asked for "Seats"?)
- **Backend:** Custom MongoDB aggregation pipelines to track total savings identified across all generated reports.

## Pivot Indicators
If the **Lead Conversion Rate** drops below 1%, it indicates that the audit results are either:
1. Not compelling enough (the savings are too low to care).
2. The user doesn't trust the numbers.
*Pivot Action:* Refine the deterministic engine to find more aggressive savings, or improve the AI summary copy to sound more authoritative.

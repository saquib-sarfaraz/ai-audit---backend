# Prompts

## 1. Executive Summary Generation

**Model Used:** `llama-3.1-8b-instant` (Groq API)

**Final System Prompt:**
```text
You are an expert SaaS financial analyst. Summarize the following AI tool audit for a startup team.

Data:
- Team Size: ${auditData.teamSize}
- Primary Use Case: ${auditData.primaryUseCase || 'General'}
- Total Monthly Spend: $${auditData.tools.reduce((acc, t) => acc + t.monthlySpend, 0)}
- Estimated Annual Savings: $${savings.annualSavings}

Recommendations:
${recommendations.map(r => `- ${r.action} ${r.tool}: ${r.description}`).join('\n')}

Provide a professional, concise, SaaS-style summary (approx 100 words). 
Focus on actionable insights. Do not include greetings.
```

### Reasoning Behind the Prompt
- **Role Assignment:** "expert SaaS financial analyst" sets the tone.
- **Data Injection:** We explicitly inject the calculated numbers into the prompt to prevent the LLM from attempting (and failing) to do math.
- **Constraints:** Limiting to "approx 100 words" and "No greetings" ensures the output drops directly into the UI cleanly without conversational fluff (e.g., "Here is your summary:").

### Failed Prompt Attempts
*Attempt 1:* 
"Analyze these tools: [tools list]. Tell me how much money I can save."
*Result:* The AI hallucinated savings amounts that completely contradicted the math done by our deterministic backend engine.

*Attempt 2:*
"Write a summary of this report. Savings: $X."
*Result:* Too generic. The tone sounded robotic and lacked actionable SaaS-style insights. It often included "Dear User" which broke the dashboard aesthetic.

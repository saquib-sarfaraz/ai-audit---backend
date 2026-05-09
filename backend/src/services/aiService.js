const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
});

const sanitizeSummary = (text) => {
  if (!text) return "";
  // Strip any intro conversational filler if AI hallucinated it
  let cleaned = text.replace(/^(Here is your summary|As an expert|Based on the data):?\s*/i, "");
  // Ensure it doesn't end mid-sentence at a hanging numbered item
  cleaned = cleaned.replace(/\n\d+\.?\s*$/g, "");
  // Simple trim
  return cleaned.trim();
};

const generateSummary = async (auditData, recommendations, savings) => {
  try {
    const safeTools = Array.isArray(auditData?.tools) ? auditData.tools : [];
    const safeRecs = Array.isArray(recommendations) ? recommendations : [];
    
    const prompt = `
      You are a Senior Financial Systems Auditor. Generate a concise, high-impact, investor-ready executive summary for this AI tooling audit.
      
      CONTEXT:
      - Team Size: ${auditData?.teamSize || 'Unknown'}
      - Primary Use Case: ${auditData?.primaryUseCase || 'General SaaS Ops'}
      - Total Current Monthly Spend: $${safeTools.reduce((acc, t) => acc + (t.currentMonthlySpendUsd || 0), 0)}
      - Identified Immediate Annual Savings Potential: $${savings?.annualSavings || 0}
      
      KEY DATA POINTS:
      ${safeRecs.map(r => `- [${(r.type || 'Action').toUpperCase()}] ${(r.toolId || 'Tool')}: ${r.description || ''}`).join('\n')}
      
      OUTPUT REQUIREMENTS:
      - Write directly in 3 brief, crisp paragraphs.
      - Paragraph 1: High-level posture (current spend vs ideal stack).
      - Paragraph 2: Primary bleed risks and redundant overhead signals detected.
      - Paragraph 3: Actionable quick-wins for management execution.
      - Tone: Crisp, objective, authoritative. 
      - Do NOT use conversational filler, do NOT use markdown lists, keep under 120 words absolute max.
      - ABSOLUTELY NO INTRODUCTORY OR CONCLUDING PHRASES. Output the report content directly.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.4, // Slightly lower for less hallucination
      max_tokens: 200,
    }, { timeout: 10000 });

    const rawContent = chatCompletion.choices[0]?.message?.content;
    return sanitizeSummary(rawContent) || getFallbackSummary(savings?.annualSavings || 0);
  } catch (error) {
    console.error('CRITICAL Groq AI Error Handled:', error.message);
    return getFallbackSummary(savings?.annualSavings || 0);
  }
};

const getFallbackSummary = (annualSavings) => {
  return `Based on our analysis, your team has significant optimization opportunities. By adjusting your current AI tool subscriptions and exploring cost-effective alternatives, you could save an estimated $${annualSavings.toLocaleString()} annually. Review the specific recommendations below to align your AI stack with your team's actual usage and avoid unnecessary enterprise premiums.`;
};

module.exports = {
  generateSummary,
};

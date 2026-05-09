const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
});

const generateSummary = async (auditData, recommendations, savings) => {
  const prompt = `
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
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.5,
      max_tokens: 150,
    });

    return chatCompletion.choices[0]?.message?.content || getFallbackSummary(savings.annualSavings);
  } catch (error) {
    console.error('Groq API Error:', error.message);
    return getFallbackSummary(savings.annualSavings);
  }
};

const getFallbackSummary = (annualSavings) => {
  return `Based on our analysis, your team has significant optimization opportunities. By adjusting your current AI tool subscriptions and exploring cost-effective alternatives, you could save an estimated $${annualSavings.toLocaleString()} annually. Review the specific recommendations below to align your AI stack with your team's actual usage and avoid unnecessary enterprise premiums.`;
};

module.exports = {
  generateSummary,
};

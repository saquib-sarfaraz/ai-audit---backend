const { generateSummary } = require('../src/services/aiService');
const { Groq } = require('groq-sdk');

jest.mock('groq-sdk', () => {
  return {
    Groq: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockRejectedValue(new Error('API Timeout')), // Mock a failure
          },
        },
      };
    }),
  };
});

describe('AI Service', () => {
  it('should return a fallback summary when Groq API fails', async () => {
    const auditData = { teamSize: 10, tools: [{ monthlySpend: 100 }] };
    const recommendations = [];
    const savings = { annualSavings: 5000 };

    const result = await generateSummary(auditData, recommendations, savings);

    expect(result).toContain('Based on our analysis');
    expect(result).toContain('$5,000');
    expect(result).toContain('optimization opportunities');
  });
});

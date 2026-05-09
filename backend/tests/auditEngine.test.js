const { calculateAudit } = require('../src/services/auditEngine');

describe('Audit Engine', () => {
  it('should calculate correct monthly and annual spend without recommendations if optimized', () => {
    const auditData = {
      teamSize: 15,
      tools: [
        { name: 'ChatGPT', plan: 'Pro', monthlySpend: 200, seats: 10 }
      ]
    };

    const result = calculateAudit(auditData);

    expect(result.monthlySpend).toBe(200);
    expect(result.monthlySavings).toBe(0);
    expect(result.annualSavings).toBe(0);
    expect(result.recommendations.length).toBe(1);
    expect(result.recommendations[0].action).toBe('Maintain');
  });

  it('should recommend downgrade and calculate savings for small teams on enterprise plans', () => {
    const auditData = {
      teamSize: 5,
      tools: [
        { name: 'Notion AI', plan: 'Enterprise', monthlySpend: 500, seats: 5 }
      ]
    };

    const result = calculateAudit(auditData);

    expect(result.monthlySpend).toBe(500);
    expect(result.monthlySavings).toBe(200); // 40% of 500
    expect(result.annualSavings).toBe(2400); // 200 * 12
    expect(result.recommendations.length).toBe(1);
    expect(result.recommendations[0].action).toBe('Downgrade');
    expect(result.recommendations[0].tool).toBe('Notion AI');
  });

  it('should recommend alternatives for ChatGPT Plus with large teams', () => {
    const auditData = {
      teamSize: 20,
      tools: [
        { name: 'ChatGPT', plan: 'Plus', monthlySpend: 200, seats: 10 }
      ]
    };

    const result = calculateAudit(auditData);

    expect(result.recommendations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tool: 'ChatGPT',
          action: 'Alternative',
        })
      ])
    );
  });

  it('should detect overspending patterns based on high cost per seat', () => {
    const auditData = {
      teamSize: 5,
      tools: [
        { name: 'Custom AI Tool', plan: 'Pro', monthlySpend: 600, seats: 5 } // $120 per seat
      ]
    };

    const result = calculateAudit(auditData);

    expect(result.recommendations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tool: 'Custom AI Tool',
          action: 'Optimize',
        })
      ])
    );
    expect(result.monthlySavings).toBe(120); // 20% of 600
  });

  it('should handle multiple tools and aggregate savings correctly', () => {
    const auditData = {
      teamSize: 8,
      tools: [
        { name: 'Tool A', plan: 'Enterprise', monthlySpend: 1000, seats: 10 }, // Downgrade: saves 400 (cost/seat = 100, no rule 3)
        { name: 'Tool B', plan: 'Pro', monthlySpend: 100, seats: 8 }, // Ok
        { name: 'GitHub Copilot', plan: 'Business', monthlySpend: 600, seats: 8 } // Copilot optimize: saves 90 (15%)
      ]
    };

    const result = calculateAudit(auditData);

    expect(result.monthlySpend).toBe(1700);
    expect(result.monthlySavings).toBe(490); 
    expect(result.annualSavings).toBe(5880);
    expect(result.recommendations.length).toBe(2);
  });
});

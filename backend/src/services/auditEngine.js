const calculateAudit = (auditData) => {
  const { tools, teamSize } = auditData;
  let totalMonthlySpend = 0;
  let totalMonthlySavings = 0;
  const recommendations = [];

  tools.forEach(tool => {
    totalMonthlySpend += tool.monthlySpend;
    
    // Rule 1: Small team (< 10) on Enterprise plans
    if (teamSize < 10 && tool.plan.toLowerCase().includes('enterprise')) {
      const estimatedSavings = tool.monthlySpend * 0.4; // Assume 40% savings on downgrade
      totalMonthlySavings += estimatedSavings;
      recommendations.push({
        tool: tool.name,
        action: 'Downgrade',
        description: `Your team size (${teamSize}) likely doesn't need Enterprise features. Downgrading to a Pro/Team plan can save costs.`,
        estimatedMonthlySavings: estimatedSavings
      });
    }

    // Rule 2: ChatGPT Plus optimization for larger teams
    if (tool.name.toLowerCase() === 'chatgpt' && tool.plan.toLowerCase() === 'plus' && tool.seats > 5) {
      recommendations.push({
        tool: tool.name,
        action: 'Alternative',
        description: 'Consider switching to ChatGPT Team or Enterprise for centralized billing and better privacy controls, though costs may vary.',
        estimatedMonthlySavings: 0 // No direct savings, but better management
      });
    }

    // Rule 3: High spend warning
    if (tool.monthlySpend / tool.seats > 100) {
      const estimatedSavings = tool.monthlySpend * 0.2;
      totalMonthlySavings += estimatedSavings;
      recommendations.push({
        tool: tool.name,
        action: 'Optimize',
        description: `Your cost per seat ($${(tool.monthlySpend / tool.seats).toFixed(2)}) is unusually high. Review seat utilization and remove inactive users.`,
        estimatedMonthlySavings: estimatedSavings
      });
    }
    
    // Rule 4: Suggest alternatives for specific tools
    if (tool.name.toLowerCase() === 'github copilot' && tool.monthlySpend > 500) {
       recommendations.push({
        tool: tool.name,
        action: 'Optimize',
        description: 'Audit Copilot usage. Not all developers use it consistently. Consider an opt-in model rather than provisioning for the whole team.',
        estimatedMonthlySavings: tool.monthlySpend * 0.15
      });
      totalMonthlySavings += tool.monthlySpend * 0.15;
    }
  });

  // If no recommendations found
  if (recommendations.length === 0) {
     recommendations.push({
        tool: 'All Tools',
        action: 'Maintain',
        description: 'Your current AI spend appears highly optimized for your team size. Keep monitoring usage patterns.',
        estimatedMonthlySavings: 0
      });
  }

  return {
    monthlySpend: totalMonthlySpend,
    monthlySavings: totalMonthlySavings,
    annualSavings: totalMonthlySavings * 12,
    recommendations
  };
};

module.exports = {
  calculateAudit
};

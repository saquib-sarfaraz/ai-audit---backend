"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/mock-audit.ts
var mock_audit_exports = {};
__export(mock_audit_exports, {
  runMockAudit: () => runMockAudit
});
module.exports = __toCommonJS(mock_audit_exports);

// src/data/tool-pricing.ts
var toolCatalog = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "assistant",
    defaultPlanId: "team",
    alternatives: ["claude", "gemini"],
    plans: [
      {
        id: "free",
        name: "Free",
        priceType: "flat",
        priceUsdFlat: 0,
        description: "Light usage"
      },
      {
        id: "plus",
        name: "Plus",
        priceType: "per_seat",
        priceUsdPerSeat: 20,
        description: "Individual power users"
      },
      {
        id: "team",
        name: "Team",
        priceType: "per_seat",
        priceUsdPerSeat: 25,
        description: "Team seats + admin controls"
      },
      {
        id: "enterprise",
        name: "Enterprise",
        priceType: "flat",
        description: "Custom pricing"
      }
    ]
  },
  {
    id: "claude",
    name: "Claude",
    category: "assistant",
    defaultPlanId: "team",
    alternatives: ["chatgpt", "gemini"],
    plans: [
      { id: "free", name: "Free", priceType: "flat", priceUsdFlat: 0 },
      { id: "pro", name: "Pro", priceType: "per_seat", priceUsdPerSeat: 20 },
      { id: "team", name: "Team", priceType: "per_seat", priceUsdPerSeat: 25 },
      { id: "enterprise", name: "Enterprise", priceType: "flat" }
    ]
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "editor",
    defaultPlanId: "pro",
    alternatives: ["windsurf", "github_copilot"],
    plans: [
      { id: "free", name: "Free", priceType: "flat", priceUsdFlat: 0 },
      { id: "pro", name: "Pro", priceType: "per_seat", priceUsdPerSeat: 20 },
      {
        id: "business",
        name: "Business",
        priceType: "per_seat",
        priceUsdPerSeat: 40
      }
    ]
  },
  {
    id: "github_copilot",
    name: "GitHub Copilot",
    category: "copilot",
    defaultPlanId: "business",
    alternatives: ["cursor", "windsurf"],
    plans: [
      {
        id: "individual",
        name: "Individual",
        priceType: "per_seat",
        priceUsdPerSeat: 10
      },
      {
        id: "business",
        name: "Business",
        priceType: "per_seat",
        priceUsdPerSeat: 19
      },
      { id: "enterprise", name: "Enterprise", priceType: "flat" }
    ]
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "assistant",
    defaultPlanId: "business",
    alternatives: ["chatgpt", "claude"],
    plans: [
      { id: "free", name: "Free", priceType: "flat", priceUsdFlat: 0 },
      {
        id: "business",
        name: "Business",
        priceType: "per_seat",
        priceUsdPerSeat: 20
      },
      { id: "enterprise", name: "Enterprise", priceType: "flat" }
    ]
  },
  {
    id: "openai_api",
    name: "OpenAI API",
    category: "api",
    defaultPlanId: "payg",
    alternatives: ["anthropic_api"],
    plans: [
      {
        id: "payg",
        name: "Pay as you go",
        priceType: "usage",
        description: "Usage-based"
      },
      { id: "committed", name: "Committed use", priceType: "usage" }
    ]
  },
  {
    id: "anthropic_api",
    name: "Anthropic API",
    category: "api",
    defaultPlanId: "payg",
    alternatives: ["openai_api"],
    plans: [
      {
        id: "payg",
        name: "Pay as you go",
        priceType: "usage",
        description: "Usage-based"
      },
      { id: "committed", name: "Committed use", priceType: "usage" }
    ]
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "editor",
    defaultPlanId: "pro",
    alternatives: ["cursor", "github_copilot"],
    plans: [
      { id: "free", name: "Free", priceType: "flat", priceUsdFlat: 0 },
      { id: "pro", name: "Pro", priceType: "per_seat", priceUsdPerSeat: 15 },
      {
        id: "team",
        name: "Team",
        priceType: "per_seat",
        priceUsdPerSeat: 25
      }
    ]
  }
];
var toolById = new Map(
  toolCatalog.map((t) => [t.id, t])
);

// src/data/recommendations.ts
var recommendationTemplates = [
  {
    id: "api-budgeting",
    type: "budget",
    impact: "medium",
    title: "Implement prompt caching & budgets",
    description: "Add structured usage limits and introduce prompt caching to significantly cut overhead from recurring LLM requests.",
    savingsPercent: 0.18
  },
  {
    id: "seat-rightsize",
    type: "optimize",
    impact: "high",
    title: "Audit underutilized active seats",
    description: "Prune user access for team members with sub-5 logins per week. Consolidate multi-license overhead.",
    savingsPercent: 0.22
  },
  {
    id: "assistant-consolidation",
    type: "consolidate",
    impact: "medium",
    title: "Standardize duplicative LLM stack",
    description: "Standardize engineering/writing pipelines onto a single foundational LLM assistant to capture volume discounts.",
    savingsPercent: 0.25
  },
  {
    id: "downgrade-plan",
    type: "downgrade",
    impact: "high",
    title: "Offramp unnecessary Enterprise features",
    description: "Downgrade sub-scale teams to 'Team' or 'Business' tiers. Standard plan features adequately satisfy current needs.",
    savingsPercent: 0.35
  },
  {
    id: "baseline-audit",
    type: "process",
    impact: "low",
    title: "Establish recurring SaaS renewal hygiene",
    description: "Implement quarterly review mechanics to prevent future zombie accounts and credit-card bloat.",
    savingsPercent: 0.05
  }
];

// src/utils/mock-audit.ts
function safeNumber(value) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}
function percentOf(value, pct) {
  return Math.max(0, value * pct);
}
function roundUsd(value) {
  return Math.round(value * 100) / 100;
}
function makeRec(templateId, overrides) {
  const tpl = recommendationTemplates.find((t) => t.id === templateId);
  if (!tpl) return null;
  return {
    id: `${templateId}:${crypto.randomUUID()}`,
    type: tpl.type,
    impact: tpl.impact,
    title: tpl.title,
    description: tpl.description,
    toolId: tpl.toolId,
    ...overrides
  };
}
function planBenchmark(toolId, planId, seats, fallback) {
  const tool = toolById.get(toolId);
  const plan = tool?.plans.find((p) => p.id === planId);
  if (!tool || !plan) return { tool, plan: null, benchmarkMonthlyUsd: fallback };
  if (plan.priceType === "per_seat" && typeof plan.priceUsdPerSeat === "number") {
    return { tool, plan, benchmarkMonthlyUsd: plan.priceUsdPerSeat * seats };
  }
  if (plan.priceType === "flat" && typeof plan.priceUsdFlat === "number") {
    return { tool, plan, benchmarkMonthlyUsd: plan.priceUsdFlat };
  }
  return { tool, plan, benchmarkMonthlyUsd: fallback };
}
function runMockAudit(input) {
  const perTool = [];
  const recommendations = [];
  const generatedAtIso = (/* @__PURE__ */ new Date()).toISOString();
  const id = crypto.randomUUID();
  let totalCurrentMonthlyUsd = 0;
  let totalRecommendedMonthlyUsd = 0;
  const assistantSpend = [];
  for (const entry of input.tools) {
    const current = safeNumber(entry.monthlySpendUsd);
    const seats = Math.max(1, Math.floor(safeNumber(entry.seats) || 1));
    const teamSize = Math.max(1, Math.floor(safeNumber(input.teamSize) || 1));
    totalCurrentMonthlyUsd += current;
    const { tool, plan, benchmarkMonthlyUsd } = planBenchmark(
      entry.toolId,
      entry.planId,
      seats,
      current
    );
    let recommended = current;
    const notes = [];
    if (tool?.category === "assistant") {
      assistantSpend.push({ toolId: entry.toolId, spend: current });
    }
    if (tool && plan?.priceType === "per_seat" && seats > teamSize) {
      const benchTeam = planBenchmark(entry.toolId, entry.planId, teamSize, current);
      recommended = Math.min(recommended, benchTeam.benchmarkMonthlyUsd);
      notes.push("Seats exceed team size. Consider right-sizing paid seats.");
      const savings = Math.max(0, current - recommended);
      const rec = makeRec("seat-rightsize", {
        toolId: entry.toolId,
        estimatedMonthlySavingsUsd: roundUsd(savings),
        title: `Right-size ${tool.name} seats`,
        description: "Paid seats exceed team size. Reduce seats to active users and review access monthly."
      });
      if (rec && rec.estimatedMonthlySavingsUsd > 0) recommendations.push(rec);
    }
    if (tool && benchmarkMonthlyUsd > 0 && current > benchmarkMonthlyUsd * 1.1) {
      recommended = Math.min(recommended, benchmarkMonthlyUsd);
      notes.push("Spend is higher than a simple plan estimate. Verify billing + add-ons.");
    }
    if (tool && plan?.priceType === "per_seat" && seats <= 3) {
      const cheaper = tool.plans.filter((p) => p.priceType === "per_seat" && typeof p.priceUsdPerSeat === "number").sort((a, b) => (a.priceUsdPerSeat ?? 0) - (b.priceUsdPerSeat ?? 0))[0];
      if (cheaper && cheaper.id !== plan.id && (cheaper.priceUsdPerSeat ?? 0) < (plan.priceUsdPerSeat ?? 0)) {
        const downgradeBench = (cheaper.priceUsdPerSeat ?? 0) * seats;
        if (current > downgradeBench) {
          recommended = Math.min(recommended, downgradeBench);
          notes.push(`Consider downgrading to ${cheaper.name} for small teams.`);
          const rec = makeRec("downgrade-plan", {
            toolId: entry.toolId,
            estimatedMonthlySavingsUsd: roundUsd(Math.max(0, current - recommended)),
            title: `Downgrade ${tool.name} plan`,
            description: `For ${seats} seats, ${cheaper.name} may be sufficient. Keep higher tiers for admin needs.`
          });
          if (rec && rec.estimatedMonthlySavingsUsd > 0) recommendations.push(rec);
        }
      }
    }
    if (tool?.category === "api" && current >= 150) {
      const savings = percentOf(current, 0.15);
      const rec = makeRec("api-budgeting", {
        toolId: entry.toolId,
        estimatedMonthlySavingsUsd: roundUsd(savings)
      });
      if (rec && rec.estimatedMonthlySavingsUsd > 0) recommendations.push(rec);
      recommended = Math.min(recommended, current - savings);
      notes.push("Add budgets, caching, and batching to reduce usage-based spend.");
    }
    if (tool && tool.alternatives.length > 0 && current >= 250) {
      const alt = toolById.get(tool.alternatives[0]);
      const savings = percentOf(current, 0.1);
      recommendations.push({
        id: `alternative:${crypto.randomUUID()}`,
        type: "alternative",
        impact: "medium",
        toolId: entry.toolId,
        title: alt ? `Evaluate ${alt.name} as an alternative` : "Evaluate alternatives",
        description: alt ? `Depending on your workflow, you may consolidate seats or swap to ${alt.name} for parts of the team.` : "Depending on your workflow, consolidating or swapping tools may reduce spend.",
        estimatedMonthlySavingsUsd: roundUsd(savings)
      });
      notes.push("Consider an alternative tool or consolidating overlapping spend.");
      recommended = Math.min(recommended, current - savings);
    }
    recommended = Math.max(0, recommended);
    totalRecommendedMonthlyUsd += recommended;
    perTool.push({
      toolId: entry.toolId,
      currentMonthlySpendUsd: roundUsd(current),
      recommendedMonthlySpendUsd: roundUsd(recommended),
      monthlySavingsUsd: roundUsd(Math.max(0, current - recommended)),
      notes
    });
  }
  if (assistantSpend.length >= 2) {
    const combined = assistantSpend.reduce((acc, x) => acc + x.spend, 0);
    const savings = percentOf(combined, 0.15);
    const rec = makeRec("assistant-consolidation", {
      estimatedMonthlySavingsUsd: roundUsd(savings)
    });
    if (rec && rec.estimatedMonthlySavingsUsd > 0) recommendations.push(rec);
  }
  if (recommendations.length < 2) {
    const baseRec = makeRec("baseline-audit", {
      estimatedMonthlySavingsUsd: roundUsd(totalCurrentMonthlyUsd * 0.03)
    });
    if (baseRec) recommendations.push(baseRec);
    // Adjust totals minimally
    totalRecommendedMonthlyUsd -= (totalCurrentMonthlyUsd * 0.03);
  }

  const totalMonthlySavingsUsd = roundUsd(
    Math.max(0, totalCurrentMonthlyUsd - Math.max(0, totalRecommendedMonthlyUsd))
  );
  const totalAnnualSavingsUsd = roundUsd(totalMonthlySavingsUsd * 12);
  return {
    id,
    generatedAtIso,
    totalCurrentMonthlyUsd: roundUsd(totalCurrentMonthlyUsd),
    totalRecommendedMonthlyUsd: roundUsd(totalRecommendedMonthlyUsd),
    totalMonthlySavingsUsd,
    totalAnnualSavingsUsd,
    perTool: perTool.sort((a, b) => b.monthlySavingsUsd - a.monthlySavingsUsd),
    recommendations: recommendations.filter((r) => r.estimatedMonthlySavingsUsd > 0).sort((a, b) => b.estimatedMonthlySavingsUsd - a.estimatedMonthlySavingsUsd).slice(0, 8)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runMockAudit
});

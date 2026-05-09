const Report = require('../models/Report');
const { runMockAudit } = require('../services/auditEngine');
const { auditSchema } = require('../utils/validators');
const { generateSummary } = require('../services/aiService');

/**
 * Triggers asynchronous AI summary generation for a given report.
 * Runs in background and does not block the audit response.
 */
const generateReportSummary = async (reportId) => {
  try {
    const report = await Report.findOne({ reportId });
    if (!report) {
      console.error("Report not found for summary generation:", reportId);
      return;
    }
    if (report.summary) {
      console.log("Summary already exists for report:", reportId);
      return;
    }

    const auditData = {
      teamSize: report.teamSize,
      primaryUseCase: report.primaryUseCase || 'General',
      tools: report.tools,
    };
    const savings = { annualSavings: report.annualSavings };

    const summary = await generateSummary(auditData, report.recommendations, savings);
    report.summary = summary || "AI-generated summary unavailable.";
    await report.save();
    console.log("AI summary generated and saved for report:", reportId);
  } catch (error) {
    console.error("Error generating summary for report:", reportId, error);
    // Ensure fallback summary if none set
    try {
      const report = await Report.findOne({ reportId });
      if (report && !report.summary) {
        report.summary = "AI-generated summary unavailable.";
        await report.save();
      }
    } catch (fallbackErr) {
      console.error("Failed to save fallback summary:", fallbackErr);
    }
  }
};

const generateAudit = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = auditSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { tools, teamSize, primaryUseCase } = value;

    // Calculate savings and recommendations
    const auditResults = runMockAudit({ tools, teamSize });

    // Create Report
    const report = await Report.create({
      tools: auditResults.perTool,
      teamSize,
      primaryUseCase,
      monthlySpend: auditResults.totalCurrentMonthlyUsd,
      monthlySavings: auditResults.totalMonthlySavingsUsd,
      annualSavings: auditResults.totalAnnualSavingsUsd,
      recommendations: auditResults.recommendations,
    });

    // Background task removed in favor of sequential frontend flow via /api/summary

    res.status(201).json({
      success: true,
      data: {
        reportId: report.reportId,
        monthlySpend: report.monthlySpend,
        monthlySavings: report.monthlySavings,
        annualSavings: report.annualSavings,
        recommendations: report.recommendations,
        summaryPlaceholder: "Summary generation available via /api/summary endpoint."
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  generateAudit,
};

const Report = require('../models/Report');
const { calculateAudit } = require('../services/auditEngine');
const { auditSchema } = require('../utils/validators');

const generateAudit = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = auditSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { tools, teamSize, primaryUseCase } = value;

    // Calculate savings and recommendations
    const auditResults = calculateAudit({ tools, teamSize });

    // Create Report
    const report = await Report.create({
      tools,
      teamSize,
      primaryUseCase,
      monthlySpend: auditResults.monthlySpend,
      monthlySavings: auditResults.monthlySavings,
      annualSavings: auditResults.annualSavings,
      recommendations: auditResults.recommendations,
    });

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

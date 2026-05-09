const Report = require('../models/Report');

const getReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    const report = await Report.findOne({ reportId: id });

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // Don't expose sensitive data, just what's needed for the public view
    res.status(200).json({
      success: true,
      data: {
        reportId: report.reportId,
        tools: report.tools,
        monthlySpend: report.monthlySpend,
        monthlySavings: report.monthlySavings,
        annualSavings: report.annualSavings,
        recommendations: report.recommendations,
        summary: report.summary,
        createdAt: report.createdAt,
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getReport,
};

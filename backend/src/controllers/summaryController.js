const Report = require('../models/Report');
const { generateSummary } = require('../services/aiService');

const createSummary = async (req, res, next) => {
  try {
    const { reportId } = req.body;

    if (!reportId) {
      return res.status(400).json({ success: false, message: 'reportId is required' });
    }

    const report = await Report.findOne({ reportId });

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    if (report.summary) {
      return res.status(200).json({ 
        success: true, 
        data: { summary: report.summary } 
      });
    }

    const auditData = {
      teamSize: report.teamSize,
      primaryUseCase: report.primaryUseCase,
      tools: report.tools
    };
    
    const savings = {
      annualSavings: report.annualSavings
    };

    // Generate summary via Groq
    const summary = await generateSummary(auditData, report.recommendations, savings);

    // Save summary to report
    report.summary = summary;
    await report.save();

    res.status(200).json({
      success: true,
      data: {
        summary: report.summary
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSummary,
};

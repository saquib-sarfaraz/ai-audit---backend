const Lead = require('../models/Lead');
const Report = require('../models/Report');
const { leadSchema } = require('../utils/validators');

const captureLead = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = leadSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, company, role, teamSize, reportId } = value;

    // Verify report exists
    const report = await Report.findOne({ reportId });
    if (!report) {
      return res.status(404).json({ success: false, message: 'Invalid report ID' });
    }

    // Check for duplicate lead for the same report
    const existingLead = await Lead.findOne({ email, reportId });
    if (existingLead) {
      return res.status(409).json({ success: false, message: 'Lead already captured for this report' });
    }

    // Create lead
    const lead = await Lead.create({
      email,
      company,
      role,
      teamSize,
      reportId,
    });

    // Email functionality temporarily disabled for MVP
    // await sendConfirmationEmail(email, report.reportId, report.annualSavings);

    res.status(201).json({
      success: true,
      data: {
        leadId: lead._id,
        message: 'Lead captured successfully',
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  captureLead,
};

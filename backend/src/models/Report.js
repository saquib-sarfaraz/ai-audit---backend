const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    default: uuidv4,
    unique: true,
    index: true,
  },
  tools: [{
    name: String,
    plan: String,
    monthlySpend: Number,
    seats: Number,
  }],
  monthlySpend: {
    type: Number,
    required: true,
  },
  monthlySavings: {
    type: Number,
    required: true,
  },
  annualSavings: {
    type: Number,
    required: true,
  },
  recommendations: [{
    tool: String,
    action: String, // e.g., "Downgrade", "Alternative", "Optimize"
    description: String,
    estimatedMonthlySavings: Number,
  }],
  summary: {
    type: String,
    default: null,
  },
  teamSize: {
    type: Number,
  },
  primaryUseCase: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

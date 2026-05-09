const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  company: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  teamSize: {
    type: Number,
  },
  reportId: {
    type: String,
    required: true,
    index: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);

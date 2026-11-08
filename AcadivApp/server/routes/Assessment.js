const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  roleNumber: { type: String, required: true, ref: 'User' }, // User ka unique role number
  riasecScores: {
    realistic: { type: Number, default: 0 },
    investigative: { type: Number, default: 0 },
    artistic: { type: Number, default: 0 },
    social: { type: Number, default: 0 },
    enterprising: { type: Number, default: 0 },
    conventional: { type: Number, default: 0 }
  },
  primaryCareerMatch: { type: String, required: true },
  selectedCategory: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
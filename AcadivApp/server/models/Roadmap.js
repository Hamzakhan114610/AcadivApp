const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  careerMatch: { type: String, required: true, unique: true }, // e.g., 'Software Engineer / Hardware Specialist'
  title: { type: String, required: true },
  description: { type: String },
  steps: [{
    stepNumber: Number,
    title: String,
    description: String,
    resources: [String]
  }]
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
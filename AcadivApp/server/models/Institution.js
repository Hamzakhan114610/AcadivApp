const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  programs: [{ type: String, required: true }],
  city: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'IT', 'Engineering', 'Art'
  deepLinkUrl: { type: String, required: true },
  isFeatured: { type: Boolean, default: false } // Jawan Pakistan / Prioritized institutes ke liye
});

module.exports = mongoose.model('Institution', institutionSchema);
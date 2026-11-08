const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  roleNumber: {
    type: String,
    unique: true,
    sparse: true,
  },

  city: {
    type: String,
    default: '',
  },

  selectedField: {
    type: String,
    default: '',
  },

  hasCompletedTest: {
    type: Boolean,
    default: false,
  },

  riasecScores: {
    type: Object,
    default: {},
  },

}, { timestamps: true });

// Automatically hash password before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', UserSchema);

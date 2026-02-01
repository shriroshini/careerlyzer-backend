const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  careerName: {
    type: String,
    required: true,
    unique: true
  },
  requiredSkills: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  roadmap: [{
    step: Number,
    title: String,
    description: String,
    resources: [String]
  }],
  averageSalary: {
    type: String,
    default: 'Varies'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Career', careerSchema);
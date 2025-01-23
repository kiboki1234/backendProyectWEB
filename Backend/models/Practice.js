const mongoose = require('mongoose');

const PracticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
}, { timestamps: true });

const Practice = mongoose.model('Practice', PracticeSchema);
module.exports = Practice;

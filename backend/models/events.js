// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availableTickets: { type: Number, required: true }
});

module.exports = mongoose.model('Event', eventSchema);

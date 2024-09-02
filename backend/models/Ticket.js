// Defines individual tickets, including the event they are related to.

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  seatNumber: { type: String, required: true },
  user: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/events');
const Ticket = require('../models/Ticket');

// Route to handle ticket purchases
router.post('/', async (req, res) => {
    const { eventId, userId, ticketCount } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ status: 'error', message: 'Invalid event ID format' });
    }
  
    const event = await Event.findById(eventId);
  
    if (!event) {
        return res.status(404).json({ status: 'error', message: 'Event not found' });
    }
  
    if (event.availableTickets < ticketCount) {
        return res.status(400).json({ status: 'error', message: 'Not enough tickets available' });
    }
  
    event.availableTickets -= ticketCount;
    await event.save();
  
    for (let i = 0; i < ticketCount; i++) {
        const ticket = new Ticket({
            event: eventId,
            seatNumber: `Seat ${i + 1}`,
            user: userId
        });
        await ticket.save();
    }
  
    const purchaseConfirmation = {
        purchaseId: new Date().getTime(),
        eventId,
        userId,
        ticketCount,
        status: 'success',
        message: 'Purchase completed successfully'
    };
  
    res.status(201).json(purchaseConfirmation);
});

module.exports = router;

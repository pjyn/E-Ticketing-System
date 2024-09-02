// Handle ticket logic.

const Ticket = require('../models/Ticket');
const Event = require('../models/events'); 

exports.getAllTickets = async (req, res) => {
    try {
      // Populate the 'event' field with event details if needed
      const tickets = await Ticket.find().populate('event'); 
      res.json(tickets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

// Fetch available seats for an event
exports.getAvailableSeats = async (req, res) => {
    const { eventId } = req.query; // Access eventId from query parameters
  
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }
  
    try {
      // Fetch the event
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Fetch booked seats for the event
      const bookedSeats = await Ticket.find({ event: eventId }).select('seatNumber');
  
      // Get all seat numbers for the event
      const allSeats = Array.from({ length: event.availableTickets }, (_, i) => i + 1); // Example seat numbers
  
      // Determine available seats
      const availableSeats = allSeats.filter(seat => !bookedSeats.some(ticket => ticket.seatNumber === seat));
  
      res.json(availableSeats);
    } catch (err) {
      console.error('Error fetching available seats:', err);
      res.status(500).json({ message: err.message });
    }
};
  

exports.createTicket = async (req, res) => {
    const { event, seatNumber, user } = req.body;
    
    // Check if event exists
    const existingEvent = await mongoose.model('Event').findById(event);
    
    if (!existingEvent) {
        return res.status(404).json({ message: 'Event not found' });
    }

    const ticket = new Ticket({ event, seatNumber, user });
    try {
        const newTicket = await ticket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


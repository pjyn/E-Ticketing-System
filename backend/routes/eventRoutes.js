const express = require('express');
const router = express.Router();

const events = [
    { id: 1, name: 'Event 1', date: '2024-09-01' },
    { id: 2, name: 'Event 2', date: '2024-10-01' }
];

// Route to get all events
router.get('/', (req, res) => {
    res.json(events);
  });
  
  // Route to get a specific event by ID
  router.get('/:id', (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const event = events.find(event => event.id === eventId);
  
    if (event) {
      res.json(event);
    } else {
      res.status(404).send('Event not found');
    }
  });
  
  module.exports = router;

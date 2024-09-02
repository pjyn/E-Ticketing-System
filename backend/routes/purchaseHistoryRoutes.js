const express = require('express');
const router = express.Router();

// Mock purchase history data (this would normally be in a database)
const purchaseHistory = [
  {
    userId: 123,
    orders: [
      { purchaseId: 1, eventId: 1, ticketCount: 2, purchaseDate: '2024-09-01' },
      { purchaseId: 2, eventId: 2, ticketCount: 1, purchaseDate: '2024-09-02' },
    ]
  },
  {
    userId: 456,
    orders: [
      { purchaseId: 3, eventId: 2, ticketCount: 3, purchaseDate: '2024-09-03' },
    ]
  }
];

// Route to handle retrieving purchase history for a user
router.get('/', (req, res) => {
  const userId = parseInt(req.query.userId); // Assume the userId is passed as a query parameter

  console.log("Received request for userId:", userId);

  // Find the user's purchase history by userId
  const userHistory = purchaseHistory.find(history => history.userId === userId);

  if (!userHistory) {
    return res.status(404).json({ status: 'error', message: 'No purchase history found for this user' });
  }

  // Respond with the user's purchase history
  res.status(200).json({ status: 'success', orders: userHistory.orders });
});

module.exports = router;

// Configure middleware and routes.

const express = require('express');
const app = express();
const ticketRoutes = require('./routes/ticketRoutes');
const eventRoutes = require('./routes/eventRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const purchaseHistoryRoutes = require('./routes/purchaseHistoryRoutes');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the URL of your frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // If you're using credentials like cookies
};
  
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/tickets/', ticketRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/history', purchaseHistoryRoutes);

module.exports = app;

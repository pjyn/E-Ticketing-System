// Configure middleware and routes.

const express = require('express');
const app = express();
const ticketRoutes = require('./routes/ticketRoutes');
const eventRoutes = require('./routes/eventRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const purchaseHistoryRoutes = require('./routes/purchaseHistoryRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/tickets/', ticketRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/history', purchaseHistoryRoutes);

module.exports = app;

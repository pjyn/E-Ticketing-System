import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import TicketPurchase from './pages/TicketPurchase';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/purchase" element={<TicketPurchase />} />
        <Route path="/history" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

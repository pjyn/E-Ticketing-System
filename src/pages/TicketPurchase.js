import React, { useState } from 'react';
import SeatSelection from '../components/SeatSelection';

function TicketPurchase() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [eventId, setEventId] = useState('66d412414b261214dd11b9c9'); // Default event ID

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      const response = await fetch('http://127.0.0.1:5001/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '123', // Replace with dynamic userId if needed
          eventId,       
          ticketCount: selectedSeats.length,
        }),
      });
  
      const responseData = await response.json(); // Get detailed response
      if (response.ok) {
        alert('Purchase successful!');
        console.log('Purchase response:', responseData); // Debug log
      } else {
        alert(`Purchase failed: ${responseData.message || response.statusText}`);
        console.error('Purchase failed:', responseData); // Debug log
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('An error occurred during the purchase.');
    } finally {
      setIsPurchasing(false);
    }
  };
  

  return (
    <div>
      <h1>Purchase Ticket</h1>
      <div>
        <label htmlFor="eventSelect">Select Event:</label>
        <select
          id="eventSelect"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        >
          <option value="66d412414b261214dd11b9c9">Event 1</option>
          <option value="66d412414b261214dd11b9ca">Event 2</option>
          {/* Add more options if needed */}
        </select>
      </div>
      <SeatSelection eventId={eventId} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
      <div>
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <button onClick={handlePurchase} disabled={isPurchasing || selectedSeats.length === 0}>
          {isPurchasing ? 'Processing...' : 'Confirm Purchase'}
        </button>
      </div>
    </div>
  );
}

export default TicketPurchase;

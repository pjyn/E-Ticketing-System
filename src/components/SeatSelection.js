import React, { useEffect, useState } from 'react';

function SeatSelection({ eventId, selectedSeats, setSelectedSeats }) {
  const [availableSeats, setAvailableSeats] = useState([]);
  
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/api/tickets/seats?eventId=${eventId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched seats:', data); // Debug log
          setAvailableSeats(data || []); // Ensure data is set correctly
        } else {
          console.error('Failed to fetch seats:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };

    fetchSeats();
  }, [eventId]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  return (
    <div>
      <h2>Select Your Seats</h2>
      <div>
        {availableSeats.length > 0 ? (
          <ul>
            {availableSeats.map((seat) => (
              <li 
                key={seat} 
                onClick={() => handleSeatClick(seat)} 
                style={{ cursor: 'pointer', padding: '5px', display: 'inline-block', border: '1px solid #000', margin: '5px', backgroundColor: selectedSeats.includes(seat) ? '#ccc' : '#fff' }}
              >
                {seat} {selectedSeats.includes(seat) ? '✓' : ''}
              </li>
            ))}
          </ul>
        ) : (
          <p>No seats available.</p>
        )}
      </div>
    </div>
  );
}

export default SeatSelection;

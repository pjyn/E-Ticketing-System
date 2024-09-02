import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EventDetails() {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the event details from the backend
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Tickets Available: {event.availableTickets}</p>
      <p>Description: {event.description || 'No description available'}</p>
      {/* Add more event details as needed */}
      <a href={`/purchase?eventId=${event._id}`}>Purchase Tickets</a>
    </div>
  );
}

export default EventDetails;

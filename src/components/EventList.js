import React, { useEffect, useState } from 'react';

function EventsList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5001/api/events/')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div>
            <h2>Available Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        {event.name} - {event.availableTickets} tickets available
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventsList;

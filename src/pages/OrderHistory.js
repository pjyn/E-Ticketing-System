// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Mock user ID (you might want to retrieve this from authentication context)
//     const userId = 123;

//     // Fetch purchase history for the user
//     axios.get(`/api/history?userId=${userId}`)
//       .then(response => {
//         if (response.data.status === 'success') {
//           setOrders(response.data.orders);
//         } else {
//           setError(response.data.message);
//         }
//       })
//       .catch(err => {
//         setError('Failed to fetch purchase history.');
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Order History</h1>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         <ul>
//           {orders.map((order, index) => (
//             <li key={index}>
//               <strong>Purchase ID:</strong> {order.purchaseId}<br />
//               <strong>Event ID:</strong> {order.eventId}<br />
//               <strong>Tickets:</strong> {order.ticketCount}<br />
//               <strong>Date:</strong> {order.purchaseDate}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default OrderHistory;


////////  %%%%%%%%%   $$$$$$$$$$$$$

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const userId = 123; // Replace with actual logic to get the user ID

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`http://127.0.0.1:5001/api/history?userId=${userId}`);
        setOrders(response.data.orders);
      } catch (error) {
        setError('Failed to fetch order history');
      }
    }

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h1>Order History</h1>
      {error && <p>{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.purchaseId}>
              <p>Order ID: {order.purchaseId}</p>
              <p>Event ID: {order.eventId}</p>
              <p>Ticket Count: {order.ticketCount}</p>
              <p>Purchase Date: {order.purchaseDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;

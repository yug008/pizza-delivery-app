import { useEffect, useState } from 'react';
import API from '../utils/api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await API.get('/orders/my-orders');
      setOrders(res.data.data);
    };

    load();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map((o) => (
        <div key={o._id} style={{ border: '1px solid gray', margin: 10 }}>
          <p>Total: {o.totalPrice}</p>
          <p>Status: {o.orderStatus}</p>
        </div>
      ))}
    </div>
  );
}
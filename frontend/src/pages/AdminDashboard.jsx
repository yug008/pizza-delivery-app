import { useEffect, useState } from 'react';
import API from '../utils/api';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await API.get('/admin/orders');
      setOrders(res.data.data);
    };

    load();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/admin/orders/${id}/status`, {
      orderStatus: status,
    });

    alert('Status updated');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {orders.map((o) => (
        <div key={o._id} style={{ border: '1px solid black', margin: 10 }}>
          <p>Order Total: {o.totalPrice}</p>

          <select
            onChange={(e) => updateStatus(o._id, e.target.value)}
          >
            <option>Order Received</option>
            <option>In Kitchen</option>
            <option>Sent For Delivery</option>
          </select>
        </div>
      ))}
    </div>
  );
}
import { useEffect, useState } from 'react';
import API from '../utils/api';

export default function PizzaBuilder() {
  const [bases, setBases] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);

  const [selected, setSelected] = useState({
    pizzaBase: '',
    sauce: '',
    cheese: '',
    veggies: [],
    meats: [],
  });

  useEffect(() => {
    const load = async () => {
      const [b, s, c] = await Promise.all([
        API.get('/pizza-bases'),
        API.get('/sauces'),
        API.get('/cheeses'),
      ]);

      setBases(b.data.data || b.data);
      setSauces(s.data.data || s.data);
      setCheeses(c.data.data || c.data);
    };

    load();
  }, []);

  const placeOrder = async () => {
    await API.post('/orders', selected);
    alert('Order placed successfully!');
  };

  return (
    <div>
      <h2>Build Your Pizza</h2>

      {/* BASE */}
      <select
        onChange={(e) =>
          setSelected({ ...selected, pizzaBase: e.target.value })
        }
      >
        <option>Select Base</option>
        {bases.map((b) => (
          <option key={b._id} value={b._id}>
            {b.name}
          </option>
        ))}
      </select>

      {/* SAUCE */}
      <select
        onChange={(e) =>
          setSelected({ ...selected, sauce: e.target.value })
        }
      >
        <option>Select Sauce</option>
        {sauces.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* CHEESE */}
      <select
        onChange={(e) =>
          setSelected({ ...selected, cheese: e.target.value })
        }
      >
        <option>Select Cheese</option>
        {cheeses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
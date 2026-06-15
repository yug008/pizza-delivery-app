import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const login = async () => {
    const res = await API.post('/auth/login', {
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);
    nav('/dashboard');
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
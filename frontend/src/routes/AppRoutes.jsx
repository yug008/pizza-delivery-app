import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import MyOrders from '../pages/MyOrders';
import AdminDashboard from '../pages/AdminDashboard';

const isAuth = () => !!localStorage.getItem('token');
const isAdmin = () => localStorage.getItem('role') === 'admin';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER */}
      <Route
        path="/dashboard"
        element={isAuth() ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route
        path="/orders"
        element={isAuth() ? <MyOrders /> : <Navigate to="/" />}
      />

      {/* ADMIN ONLY */}
      <Route
        path="/admin"
        element={
          isAuth() && isAdmin() ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}
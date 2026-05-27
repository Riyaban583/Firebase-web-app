import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';
import Notes from './pages/Notes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
  path="/notes"
  element={
    <ProtectedRoute>
      <Notes />
    </ProtectedRoute>
  }
/>

        </Routes>

        <ToastContainer />

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
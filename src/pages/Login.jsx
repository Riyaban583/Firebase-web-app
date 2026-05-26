import React, { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import './Auth.css';

const Login = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login Successful");

      navigate('/dashboard');

    } catch (error) {

      toast.error(error.message);

    }
  };

  return (

    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT SECTION */}

        <div className="auth-left">

          <h1>Welcome Back 👋</h1>

          <p>

            Login to manage your realtime notes,
            organize tasks and access your beautiful dashboard.

          </p>

        </div>

        {/* RIGHT SECTION */}

        <div className="auth-right">

          <form
            className="auth-form"
            onSubmit={handleLogin}
          >

            <h2>Login</h2>

            {/* EMAIL */}

            <div className="input-box">

              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Email</label>

            </div>

            {/* PASSWORD */}

            <div className="input-box">

              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>Password</label>

            </div>

            {/* BUTTON */}

            <button type="submit">

              Login

            </button>

            {/* SWITCH */}

            <p className="switch-text">

              Don’t have an account?

              <Link to="/register">

                Register

              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>

  );
};

export default Login;
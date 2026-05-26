import React, { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import './Auth.css';

const Register = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success("Registration Successful");

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

          <h1>Create Account 🚀</h1>

          <p>

            Join your realtime Firebase Notes App
            and manage tasks, notes and productivity
            with beautiful UI and animations.

          </p>

        </div>

        {/* RIGHT SECTION */}

        <div className="auth-right">

          <form
            className="auth-form"
            onSubmit={handleRegister}
          >

            <h2>Register</h2>

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

              Create Account

            </button>

            {/* SWITCH */}

            <p className="switch-text">

              Already have an account?

              <Link to="/login">

                Login

              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>

  );
};

export default Register;
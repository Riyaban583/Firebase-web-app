import React, { useState, useEffect } from 'react';

import {
  updateProfile,
  updateEmail,
  updatePassword,
  signOut
} from 'firebase/auth';

import { auth } from '../firebase';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import './Dashboard.css';

const Dashboard = () => {

  const navigate = useNavigate();

  // PROFILE STATES

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  // PROFILE IMAGE

  const [profileImage, setProfileImage] = useState(

    localStorage.getItem('profileImage')

    ||

    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'

  );

  // DARK MODE

  const [darkMode, setDarkMode] = useState(false);

  // LOAD SAVED THEME

  useEffect(()=>{

    const savedTheme = localStorage.getItem('theme');

    if(savedTheme === 'dark'){

      setDarkMode(true);

    }else{

      setDarkMode(false);

    }

  },[]);

  // IMAGE UPLOAD

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if(file){

      const imageUrl = URL.createObjectURL(file);

      setProfileImage(imageUrl);

      localStorage.setItem(

        'profileImage',

        imageUrl

      );

      toast.success('Profile Photo Updated');

    }
  };

  // THEME TOGGLE

  const toggleTheme = () => {

    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(

      'theme',

      newTheme ? 'dark' : 'light'

    );

  };

  // UPDATE PROFILE

  const updateUser = async () => {

    try {

      if(name){

        await updateProfile(auth.currentUser, {

          displayName:name

        });

      }

      if(email){

        await updateEmail(auth.currentUser, email);

      }

      if(password){

        await updatePassword(auth.currentUser, password);

      }

      toast.success('Profile Updated');

    } catch(error){

      if(error.code === 'auth/requires-recent-login'){

        toast.error(

          'Please logout and login again'

        );

      }else{

        toast.error(error.message);

      }

    }
  };

  // LOGOUT

  const handleLogout = async () => {

    try {

      await signOut(auth);

      toast.success('Logout Successful');

      navigate('/login');

    } catch(error){

      toast.error(error.message);

    }
  };

  return (

    <div className={darkMode ? 'dashboard dark' : 'dashboard'}>

      <div className='dashboard-container'>

        {/* TOP BAR */}

        <div className='top-bar'>

          <h1>Dashboard</h1>

          <div className='top-buttons'>

            <button
              className='theme-btn'
              onClick={toggleTheme}
            >

              {darkMode ? '☀️ Light' : '🌙 Dark'}

            </button>

            <button
              className='logout-btn'
              onClick={handleLogout}
            >

              Logout

            </button>

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div className='dashboard-layout'>

          {/* PROFILE CARD */}

          <div className='profile-card'>

            <h2>User Profile</h2>

            {/* PROFILE IMAGE */}

            <div className='profile-image-section'>

              <img

                src={profileImage}

                alt='Profile'

                className='profile-image'
              />

              <label className='upload-btn'>

                Upload Photo

                <input
                  type='file'
                  accept='image/*'
                  hidden
                  onChange={handleImageChange}
                />

              </label>

            </div>

            {/* USER INFO */}

            <div className='user-info'>

              <p>

                <strong>Name:</strong>

                {' '}

                {auth.currentUser?.displayName || 'No Name'}

              </p>

              <p>

                <strong>Email:</strong>

                {' '}

                {auth.currentUser?.email}

              </p>

            </div>

            {/* INPUTS */}

            <div className='input-group'>

              <input
                type='text'
                placeholder='Update Name'
                onChange={(e)=>setName(e.target.value)}
              />

              <input
                type='email'
                placeholder='Update Email'
                onChange={(e)=>setEmail(e.target.value)}
              />

              <input
                type='password'
                placeholder='Update Password'
                onChange={(e)=>setPassword(e.target.value)}
              />

              <button
                className='update-btn'
                onClick={updateUser}
              >

                Update Profile

              </button>

            </div>

          </div>

          {/* QUICK ACTIONS */}

          <div className='quick-actions'>

            <h2>Quick Access</h2>

            <div className='action-buttons'>

              <button
                className='notes-btn'
                onClick={()=>navigate('/notes')}
              >

                <span>📝</span>

                Open Notes

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Dashboard;
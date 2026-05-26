import React, { useState, useEffect } from 'react';

import {
  updateProfile,
  updateEmail,
  updatePassword,
  signOut
} from 'firebase/auth';

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where
} from 'firebase/firestore';

import { auth, db } from '../firebase';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import './Dashboard.css';

const Dashboard = () => {

  const navigate = useNavigate();

  // PROFILE STATES
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // NOTES STATES
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  // SEARCH
  const [search, setSearch] = useState('');

  // UPDATE PROFILE
  const updateUser = async () => {

    try {

      if (name) {

        await updateProfile(auth.currentUser, {
          displayName: name
        });

      }

      if (email) {

        await updateEmail(auth.currentUser, email);

      }

      if (password) {

        await updatePassword(auth.currentUser, password);

      }

      toast.success('Profile Updated');

    } catch (error) {

      toast.error(error.message);

    }
  };

  // LOGOUT
  const handleLogout = async () => {

    try {

      await signOut(auth);

      toast.success('Logout Successful');

      navigate('/login');

    } catch (error) {

      toast.error(error.message);

    }
  };

  // ADD NOTE
  const addNote = async () => {

    if (!title || !body) {

      toast.error('Fill all fields');

      return;
    }

    try {

      await addDoc(collection(db, 'notes'), {

        title,
        body,
        uid: auth.currentUser.uid,
        createdAt: new Date().toLocaleString()

      });

      setTitle('');
      setBody('');

      toast.success('Note Added');

    } catch (error) {

      toast.error(error.message);

    }
  };

  // REALTIME READ
  useEffect(() => {

    const q = query(

      collection(db, 'notes'),

      where('uid', '==', auth.currentUser.uid)

    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const allNotes = snapshot.docs.map((doc) => ({

        id: doc.id,
        ...doc.data()

      }));

      setNotes(allNotes);

    });

    return () => unsubscribe();

  }, []);

  // DELETE NOTE
  const deleteNote = async (id) => {

    try {

      await deleteDoc(doc(db, 'notes', id));

      toast.success('Note Deleted');

    } catch (error) {

      toast.error(error.message);

    }
  };

  // EDIT NOTE
  const editNote = (note) => {

    setTitle(note.title);
    setBody(note.body);
    setEditId(note.id);

  };

  // UPDATE NOTE
  const updateNote = async () => {

    try {

      const noteRef = doc(db, 'notes', editId);

      await updateDoc(noteRef, {

        title,
        body

      });

      toast.success('Note Updated');

      setTitle('');
      setBody('');
      setEditId(null);

    } catch (error) {

      toast.error(error.message);

    }
  };

  // SEARCH FILTER
  const filteredNotes = notes.filter((note) =>

    note.title.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div className='dashboard'>

      <div className='dashboard-container'>

        {/* TOP BAR */}

        <div className='top-bar'>

          <h1>Notes Dashboard</h1>

          <button
            className='logout-btn'
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* PROFILE */}

        <div className='profile-card'>

          <h2>User Profile</h2>

          <p>
            <strong>Name:</strong>
            {" "}
            {auth.currentUser?.displayName || 'No Name'}
          </p>

          <p>
            <strong>Email:</strong>
            {" "}
            {auth.currentUser?.email}
          </p>

          <div className='input-group'>

            <input
              type='text'
              placeholder='Update Name'
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type='email'
              placeholder='Update Email'
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type='password'
              placeholder='Update Password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className='update-btn'
              onClick={updateUser}
            >
              Update Profile
            </button>

          </div>

        </div>

        {/* NOTES SECTION */}

        <div className='notes-section'>

          <h2>Firestore Notes App</h2>

          {/* SEARCH */}

          <input
            type='text'
            placeholder='Search Notes'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='search-input'
          />

          {/* NOTE FORM */}

          <div className='note-form'>

            <input
              type='text'
              placeholder='Note Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder='Write your note here...'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            {

              editId ? (

                <button
                  className='update-btn'
                  onClick={updateNote}
                >
                  Update Note
                </button>

              ) : (

                <button
                  className='add-btn'
                  onClick={addNote}
                >
                  Add Note
                </button>

              )

            }

          </div>

          {/* NOTES GRID */}

          <div className='notes-grid'>

            {

              filteredNotes.length > 0 ? (

                filteredNotes.map((note) => (

                  <div
                    className='note-card'
                    key={note.id}
                  >

                    <h3>{note.title}</h3>

                    <p>{note.body}</p>

                    <small className='time'>
                      {note.createdAt}
                    </small>

                    <div className='note-buttons'>

                      <button
                        className='edit-btn'
                        onClick={() => editNote(note)}
                      >
                        Edit
                      </button>

                      <button
                        className='delete-btn'
                        onClick={() => deleteNote(note.id)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <h3 className='empty-notes'>
                  No Notes Found
                </h3>

              )

            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
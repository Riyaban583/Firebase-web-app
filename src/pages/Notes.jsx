import React, { useState, useEffect } from 'react';

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query
} from 'firebase/firestore';

import {
  auth,
  db
} from '../firebase';

import {
  onAuthStateChanged
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import './Notes.css';

import AIChat from '../components/AIChat';

const Notes = () => {

  const navigate = useNavigate();

  // STATES

  const [title, setTitle] = useState('');

  const [body, setBody] = useState('');

  const [notes, setNotes] = useState([]);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState('');

  const [user, setUser] = useState(null);

  // DARK MODE

  const [darkMode, setDarkMode] = useState(false);

  // LOAD THEME

  useEffect(()=>{

    const savedTheme = localStorage.getItem('theme');

    if(savedTheme === 'dark'){

      setDarkMode(true);

    }else{

      setDarkMode(false);

    }

  },[]);

  // AUTH + FETCH NOTES

  useEffect(() => {

    const unsubscribeAuth = onAuthStateChanged(

      auth,

      (currentUser) => {

        if(currentUser){

          setUser(currentUser);

          const q = query(

            collection(db,'notes')

          );

          const unsubscribeNotes = onSnapshot(

            q,

            (snapshot) => {

              const allNotes = snapshot.docs.map((doc) => ({

                id:doc.id,
                ...doc.data()

              }));

              // PINNED FIRST

              allNotes.sort(

                (a,b)=>b.pinned-a.pinned

              );

              setNotes(allNotes);

            }

          );

          return () => unsubscribeNotes();

        }

      }

    );

    return () => unsubscribeAuth();

  },[]);

  // ADD NOTE

  const addNote = async () => {

    if(!title || !body){

      toast.error('Please fill all fields');

      return;

    }

    try {

      await addDoc(collection(db,'notes'),{

        title,
        body,

        uid:user?.uid,

        pinned:false,

        createdAt:new Date().toLocaleString()

      });

      toast.success('Note Added Successfully');

      setTitle('');

      setBody('');

    } catch(error){

      toast.error(error.message);

    }
  };

  // DELETE NOTE

  const deleteNote = async (id) => {

    try {

      await deleteDoc(doc(db,'notes',id));

      toast.success('Note Deleted');

    } catch(error){

      toast.error(error.message);

    }
  };

  // EDIT NOTE

  const editNote = (note) => {

    setTitle(note.title);

    setBody(note.body);

    setEditId(note.id);

    window.scrollTo({

      top:0,
      behavior:'smooth'

    });

  };

  // UPDATE NOTE

  const updateNote = async () => {

    try {

      const noteRef = doc(db,'notes',editId);

      await updateDoc(noteRef,{

        title,
        body

      });

      toast.success('Note Updated');

      setTitle('');

      setBody('');

      setEditId(null);

    } catch(error){

      toast.error(error.message);

    }
  };

  // PIN NOTE

  const togglePin = async (note) => {

    try {

      const noteRef = doc(db,'notes',note.id);

      await updateDoc(noteRef,{

        pinned:!note.pinned

      });

    } catch(error){

      toast.error(error.message);

    }
  };

  // SEARCH FILTER

  const filteredNotes = notes.filter((note)=>

    note.title.toLowerCase()

    .includes(search.toLowerCase())

  );

  return (

    <div className={darkMode ? 'notes-page dark' : 'notes-page'}>

      {/* TOPBAR */}

      <div className='notes-topbar'>

        <h1>📝 My Notes</h1>

        <div className='topbar-buttons'>

          {/* THEME BUTTON */}

          <button
            className='theme-btn'
            onClick={()=>{

              const newTheme = !darkMode;

              setDarkMode(newTheme);

              localStorage.setItem(

                'theme',

                newTheme ? 'dark' : 'light'

              );

            }}
          >

            {darkMode ? '☀️ Light' : '🌙 Dark'}

          </button>

          {/* BACK BUTTON */}

          <button
            className='back-btn'
            onClick={()=>navigate('/dashboard')}
          >

            ← Back

          </button>

        </div>

      </div>

      {/* MAIN LAYOUT */}

      <div className='notes-layout'>

        {/* LEFT SIDE */}

        <div className='notes-left'>

          {/* NOTES FORM */}

          <div className='notes-form'>

            <input
              type='text'
              placeholder='🔍 Search Notes'
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className='search-input'
            />

            <input
              type='text'
              placeholder='📝 Note Title'
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
              placeholder='Write your note here...'
              value={body}
              onChange={(e)=>setBody(e.target.value)}
            />

            {

              editId ? (

                <button
                  className='update-btn'
                  onClick={updateNote}
                >

                  🚀 Update Note

                </button>

              ) : (

                <button
                  className='add-btn'
                  onClick={addNote}
                >

                  ➕ Add Note

                </button>

              )

            }

          </div>

          {/* NOTES GRID */}

          <div className='notes-grid'>

            {

              filteredNotes.length > 0

              ?

              filteredNotes.map((note)=>(

                <div
                  className={`note-card ${note.pinned ? 'pinned' : ''}`}
                  key={note.id}
                >

                  {/* PIN BUTTON */}

                  <button
                    className='pin-btn'
                    onClick={()=>togglePin(note)}
                  >

                    {note.pinned ? '⭐' : '📌'}

                  </button>

                  {/* TITLE */}

                  <h3>{note.title}</h3>

                  {/* BODY */}

                  <p>{note.body}</p>

                  {/* TIME */}

                  <small className='time'>

                    {note.createdAt}

                  </small>

                  {/* ACTIONS */}

                  <div className='note-actions'>

                    <button
                      className='edit-btn'
                      onClick={()=>editNote(note)}
                    >

                      ✏️ Edit

                    </button>

                    <button
                      className='delete-btn'
                      onClick={()=>deleteNote(note.id)}
                    >

                      🗑 Delete

                    </button>

                  </div>

                </div>

              ))

              :

              <div className='empty-box'>

                <h2 className='empty'>

                  No Notes Found

                </h2>

              </div>

            }

          </div>

        </div>

        {/* RIGHT SIDE AI */}

        <div className='notes-right'>

          <AIChat />

        </div>

      </div>

    </div>

  );
};

export default Notes;
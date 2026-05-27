import React, { useState } from 'react';

import axios from 'axios';

import './AIChat.css';

const AIChat = () => {

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message.trim()) {

      return;

    }

    // USER MESSAGE

    const userMessage = {

      type: 'user',

      text: message

    };

    setMessages((prev) => [

      ...prev,

      userMessage

    ]);

    const currentMessage = message;

    setMessage('');

    setLoading(true);

    try {

      const response = await axios.post(

        'https://openrouter.ai/api/v1/chat/completions',

        {

          model: 'openrouter/auto',

          messages: [

            {

              role: 'user',

              content: currentMessage

            }

          ]

        },

        {

          headers: {

            Authorization:
              `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,

            'HTTP-Referer':
              'http://localhost:3000',

            'X-Title':
              'Firebase Notes App',

            'Content-Type':
              'application/json'

          }

        }

      );

      console.log(response.data);

      const aiReply = {

        type: 'ai',

        text:
          response.data.choices[0].message.content

      };

      setMessages((prev) => [

        ...prev,

        aiReply

      ]);

    } catch (error) {

      console.log(

        error.response?.data || error.message

      );

      const errorReply = {

        type: 'ai',

        text:
          '❌ API Error. Check Console.'

      };

      setMessages((prev) => [

        ...prev,

        errorReply

      ]);

    }

    setLoading(false);

  };

  return (

    <div className='chatbot-container'>

      {/* HEADER */}

      <div className='chatbot-header'>

        <div className='bot-info'>

          <div className='bot-avatar'>

            🤖

          </div>

          <div>

            <h2>

              AI Assistant

            </h2>

            <p>

              Online

            </p>

          </div>

        </div>

      </div>

      {/* CHAT AREA */}

      <div className='chat-area'>

        {

          messages.length === 0 && (

            <div className='welcome-message'>

              <h3>

                👋 Hello Riya

              </h3>

              <p>

                Ask me anything about coding,
                Firebase, React or productivity.

              </p>

            </div>

          )

        }

        {

          messages.map((msg, index) => (

            <div

              key={index}

              className={

                msg.type === 'user'

                  ?

                  'message user-message'

                  :

                  'message ai-message'

              }

            >

              {msg.text}

            </div>

          ))

        }

        {

          loading && (

            <div className='typing'>

              AI is typing...

            </div>

          )

        }

      </div>

      {/* INPUT AREA */}

      <div className='chat-input-area'>

        <input

          type='text'

          placeholder='Type your message...'

          value={message}

          onChange={(e) =>

            setMessage(e.target.value)

          }

          onKeyDown={(e) => {

            if (e.key === 'Enter') {

              sendMessage();

            }

          }}

        />

        <button onClick={sendMessage}>

          ➤

        </button>

      </div>

    </div>

  );

};

export default AIChat;
import React, { useState } from 'react';

import axios from 'axios';

import './AIChat.css';

const AIChat = () => {

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if(!message){

      return;

    }

    // USER MESSAGE

    const userMessage = {

      type: 'user',

      text: message

    };

    setMessages((prev)=>

      [...prev, userMessage]

    );

    setLoading(true);

    try {

      const response = await axios.post(

        'https://openrouter.ai/api/v1/chat/completions',

        {

          model: 'openai/gpt-3.5-turbo',

          messages: [

            {
              role: 'user',
              content: message
            }

          ]

        },

        {

          headers: {

            Authorization:

              `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,

            'Content-Type': 'application/json'

          }

        }

      );

      const aiReply = {

        type: 'ai',

        text:

          response.data.choices[0].message.content

      };

      setMessages((prev)=>

        [...prev, aiReply]

      );

    } catch(error){

      console.log(error);

      const errorReply = {

        type: 'ai',

        text:

          '❌ Something went wrong.'

      };

      setMessages((prev)=>

        [...prev, errorReply]

      );

    }

    setMessage('');

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

            <h2>AI Assistant</h2>

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

          messages.map((msg,index)=>(

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

          onChange={(e)=>

            setMessage(e.target.value)
          }

          onKeyDown={(e)=>{

            if(e.key === 'Enter'){

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
import React, { useState, useEffect, useRef } from 'react';
import loader from '../assets/loader.gif'; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setIsLoading(true); 

      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages([...messages, { user: 'You', text: input }, { user: 'Bot', text: data.reply }]);
      setInput('');
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-stone-900 text-white' : 'bg-gray-100 text-gray-800'} transition-all duration-500`}>
      <div className="w-full max-w-4xl rounded-lg shadow-lg">
        <header className={`flex items-center justify-between px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-green-600'} text-white rounded-t-lg`}>
          <h1 className="text-2xl font-bold flex items-center">
            <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"></path>
            </svg>
            Chat-Mate
          </h1>
          <button
            className="flex items-center justify-center p-2 bg-white text-green-600 rounded-full hover:bg-gray-200 transition-all duration-300"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </header>
        <main className={`bg-${darkMode ? 'gray-800' : 'white'} p-4 rounded-b-lg shadow-lg relative`}>
          <div className={`h-96 overflow-y-auto mb-4 ${isLoading ? 'opacity-50' : ''} custom-scrollbar`}>
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg max-w-xs break-words ${msg.user === 'You' ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'} ${darkMode && msg.user !== 'You' ? 'bg-gray-600 text-white' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
              <img src={loader} alt="Loading..." className="animate-bounce h-16 w-16" />
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex mt-2">
            <input
              type="text"
              className={`flex-grow p-2 border border-gray-300 rounded-l focus:outline-none ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className={`bg-${darkMode ? 'green-500' : 'green-600'} text-white hover:bg-${darkMode ? 'green-400' : 'green-500'} p-2 rounded-r transition-all duration-300`}>
              Send 🚀
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Chat;

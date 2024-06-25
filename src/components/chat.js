import React, { useState } from 'react';
import loader from '../assets/loader.gif'; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setIsLoading(true); 

      const response = await fetch('http://localhost:3000/chat', {
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

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="flex items-center justify-between w-full max-w-4xl mb-4">
        <h1 className={`text-4xl font-bold text-center mx-auto font-serif ${darkMode ? 'text-gray-200' : 'text-terracotta'}`}>🤖 Personal Assistant 🚀</h1>
        <button className={`bg-${darkMode ? 'terracotta' : 'muted-teal'} text-gray-800 px-4 py-2 rounded flex items-center justify-center hover:bg-${darkMode ? 'terracotta-dark' : 'white'}`} onClick={toggleDarkMode}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
  {darkMode ? 'Light Mode' : 'Dark Mode'}
</button>

      </div>
      <div className={`bg-${darkMode ? 'dark' : 'light'}-beige p-4 rounded shadow-lg w-full max-w-4xl relative`}>
        <div className={`h-96 overflow-y-auto mb-4 ${isLoading ? 'opacity-50' : ''}`}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.user === 'You' ? 'text-right' : ''}`}>
              <span className={`px-2 py-1 rounded ${msg.user === 'You' ? ' text-gray-800' : 'bg-terracotta'} ${darkMode ? 'dark:text-white' : ''}`}>
             {msg.text}
              </span>
            </div>
          ))}
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
            <img src={loader} alt="Loading..." className="animate-bounce h-50 w-16" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            className={`flex-grow p-2 border border-gray-300 rounded-l ${darkMode ? 'dark:bg-gray-700 dark : dark:border-gray-600' : ''}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className={`bg-${darkMode ? 'muted-teal' : 'terracotta'} hover:bg-${darkMode ? 'muted-teal-dark' : 'terracotta-dark'} p-2 rounded-r`}>
            Send 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 

import React, { useEffect, useState } from 'react';
import Chat from './components/chat.js';
import { Analytics } from "@vercel/analytics/react"
import Loader from './components/loader.js';
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? <Loader /> : <Chat />}
      <Analytics />
    </div>
  );
}

export default App;

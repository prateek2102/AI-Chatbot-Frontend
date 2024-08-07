import React, { useEffect, useState } from 'react';
import Chat from './components/chat.js';
import { Analytics } from "@vercel/analytics/react"
import Loader from './components/loader.js';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
      <SpeedInsights/>
    </div>
  );
}

export default App;

import React from 'react';
import Chat from './components/chat.js';
import { Analytics } from "@vercel/analytics/react"
function App() {
  return (
    <div className="App">
      <Chat />
      <Analytics/>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import MoodTrackerPage from './components/MoodTrackerPage';
import QuotesPage from './components/QuotesPage';

// --- Import the Login and Registration pages we created ---
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';

import './App.css'; // Your main stylesheet

function App() {
  return (
    <Router>
      <div className="App">
       
        <nav>
          <div className="logo">🌙 Luna</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/mood">Mood</Link>
            <Link to="/quotes">Quotes</Link>

            
            <Link to="/register" className="get-started">Get Started</Link>
           
          </div>
        </nav>

       
        <main>
          <Routes>
           
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/mood" element={<MoodTrackerPage />} />
            <Route path="/quotes" element={<QuotesPage />} />

           
            <Route path="/register" element={<RegistrationPage />} />
            
           
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
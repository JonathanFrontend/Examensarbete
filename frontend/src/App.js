import React, { createContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar';
import './App.css';
import { UserContext } from './contexts/UserContext';
import StartPage from './components/StartPage';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import PollPage from './components/PollPage';
import PollResults from './components/PollResults';

function App() {
  const [user, setUser] = useState(null);

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={userValue}>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<StartPage />} />
          <Route path="/poll" element={<PollPage />} />
          <Route path="/pollresults/:id" element={<PollResults />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

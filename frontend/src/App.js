import React, { createContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Redirect, Routes, Route, Link, Navigate } from "react-router-dom";
import NavBar from './components/NavBar';
import './App.css';
import { UserContext } from './contexts/UserContext';
import StartPage from './components/StartPage';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import PollPage from './components/PollPage';
import PollResults from './components/PollResults';
import CreatePoll from './components/CreatePoll';
import SignupPage from './components/SignupPage';
import ErrorPage from './components/ErrorPage';

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={userValue}>
        <NavBar />
        <Routes>
          <Route path="/start" element={<StartPage />} />
          <Route path="/poll" element={<PollPage />} />
          <Route path="/pollresults/:id" element={<PollResults />} />
          <Route path="/createPoll" element={<CreatePoll />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/" exact element={<Navigate to={"/start"} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

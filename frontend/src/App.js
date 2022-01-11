import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar';
import './App.css';
import { UserContext } from './contexts/UserContext';
import StartPage from './components/StartPage';
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <NavBar />
      <UserContext.Provider value={"User"}>
        <Routes>
          <Route path="/" exact element={<StartPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

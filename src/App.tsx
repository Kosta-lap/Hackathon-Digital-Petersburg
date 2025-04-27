import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import InfoPage from './components/InfoPage';
import AuthPage from './components/AuthPage';
import RegPage from './components/RegPage';
import LkPage from './components/LkPage';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/regist" element={<RegPage />} />
        <Route path="/lk" element={<LkPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;

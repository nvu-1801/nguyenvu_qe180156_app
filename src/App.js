import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { StudentProvider } from './Context/StudentContext';

const App = () => (
  <StudentProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  </StudentProvider>
);

export default App;

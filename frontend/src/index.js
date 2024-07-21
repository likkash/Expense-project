import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Views from './view';
import SignUp from './signupform';
import Login from './login';
import NavBar from './navbar';
import AddExpense from './AddExpense';
import Update from './update';
import './back.css'; // Import your CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="main-container"><Login /></div>} />
        <Route path="/navbar" element={<div className="navbar-background"><NavBar /></div>} />
        <Route path="/signupform" element={<div className="main-container"><SignUp /></div>} />
        <Route path="/expenseadd" element={<div className="addupdate"><AddExpense /></div>} />
        <Route path="/view" element={<div className="viewpage"><Views /></div>} />
        <Route path="/update/:id" element={<div className="addupdate"><Update /></div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

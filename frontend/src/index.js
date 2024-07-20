import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Views from './view';
import SignUp from './signupform';
import Login from './login';
import NavBar from './navbar';
import AddExpense from './AddExpense';
import Update from './update';
// import ExpenseTable from './ExpenseTable'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/signupform" element={<SignUp />} />
        <Route path="/expenseadd" element={<AddExpense />} />
        <Route path="/View" element={<Views />} />
        <Route path="/update/:id" element={<Update />} />
        {/* <Route path="/expensetable" element={<ExpenseTable />} />  */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authenticaiton from './pages/Authentication/Authenticaiton';
import HomePage from 'pages/HomePage/HomePage';
import Message from 'pages/Message/Message';
import Login from 'pages/Authentication/Login';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/*' element={<HomePage/>}/>
        <Route path='/message' element={<Message/>}/>
        <Route path='/*' element={<Authenticaiton/>}/>
      </Routes>
    </div>
  );
}

export default App;

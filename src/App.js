import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authenticaiton from './pages/Authentication/Authenticaiton';
import HomePage from 'pages/HomePage/HomePage';
import Message from 'pages/Message/Message';
import Login from 'pages/Authentication/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from './redux/Auth/auth.action';

function App() {

  const {auth} = useSelector(store=>store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(()=>{
    dispatch(getProfileAction(jwt))
  },[jwt])
  

  return (
    <div className="">
      <Routes>
        {/* <Route path='/*' element={<HomePage/>}/> */}
        <Route path='/*' element={auth.user ? <HomePage/> :<Authenticaiton/>}/>
        <Route path='/message' element={<Message/>}/>
        <Route path='/*' element={<Authenticaiton/>}/>
      </Routes>
    </div>
  );
}

export default App;

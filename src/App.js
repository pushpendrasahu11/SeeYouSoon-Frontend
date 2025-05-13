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

// 🔸 const {auth} = useSelector(store => store);
// useSelector is a React-Redux hook that gives you access to the Redux store's state.

// Here, you’re extracting the auth slice from the store.

// Imagine your Redux store looks like this:

// js
// Copy
// Edit
// {
//   auth: {
//     user: {...},
//     isAuthenticated: true,
//     ...
//   },
//   otherSlice: {...}
// }
// auth now holds that auth object from the store.

// 🔸 const dispatch = useDispatch();
// useDispatch is another Redux hook.

// It gives you the dispatch() function so you can trigger Redux actions from this component.

// 🔸 const jwt = localStorage.getItem("jwt");
// This reads the JWT (JSON Web Token) from the browser's local storage.

// JWT is usually used for authentication; if it's present, it means the user might already be logged in.

// 🔸 useEffect(() => { dispatch(getProfileAction(jwt)) }, [jwt]);
// This useEffect runs once when the component mounts, or whenever jwt changes.

// It dispatches the getProfileAction(jwt) — which likely:

// Sends the JWT to the backend.

// Validates it.

// If valid, fetches the user's profile.

// Updates the Redux store (auth.user etc.) with that info.

// 💡 Why is this needed?
// Because even if the user reloads the page or opens the app in a new tab, the token is stored in localStorage. This code ensures the app auto-fetches the user's data and updates the app's state accordingly — maintaining login session.
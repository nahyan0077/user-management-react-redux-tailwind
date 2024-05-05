import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import axios from './axios'
import { setUserData } from './redux/features/userSlice';
import AdmHome from './pages/admin/AdmHome';
import AdmDash from './pages/admin/AdmDash';
import Profiile from './pages/Profiile';
import Security from './pages/Security';



axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user.userData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get('/fetch-user-data');
        console.log("data response",userDataResponse);
        dispatch(setUserData(userDataResponse.data));
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ userData?.role=='user' ? <Navigate to="/home" /> : <Navigate to="/signin" /> } />
          <Route path='/home' element={ userData?.role == 'user' ? <Home/> : <Navigate to="/signin" />  } />
          <Route path='/signin' element={ !userData ? <SignIn/> : userData.role=="admin" ? <Navigate to="/admin-home" /> : <Navigate to="/home" />   } />
          <Route path='/signup' element={ !userData ? <SignUp/> : userData.role=="admin" ? <Navigate to="/admin-home" /> : <Navigate to="/home" /> } />
          <Route path='/admin-home' element={ userData?.role =="admin" ? <AdmHome/> : <SignIn/> } />
          <Route path='/admin-dash' element={ userData?.role =="admin" ? <AdmDash/> : <SignIn/> } />
          <Route path='/profile' element={ userData?.role == "user" ? <Profiile/> : <Navigate to="/" /> } />
          <Route path='/security' element={ userData?.role == "user" ? <Security/> : <Navigate to="/" /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App

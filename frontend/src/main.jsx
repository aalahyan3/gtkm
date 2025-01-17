import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/main.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UsersList from './components/UsersList';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/Signup'
import Home from './components/Home'
import Profile from './components/Profile';

createRoot(document.getElementById('root')).render(
<StrictMode>
  <BrowserRouter basename='/'>
    <Routes>
      <Route index element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home/*" element={
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }>
        <Route index element={<Home />} />
        <Route path="users" element={<UsersList />} />
        <Route path="profile/:username" element={<Profile />} />
      </Route>
    </Routes>
  </BrowserRouter>
</StrictMode>

);

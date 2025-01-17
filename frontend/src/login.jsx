import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './css/main.css';
import Login from './components/Login';
import Signup from './components/Signup';
createRoot(document.getElementById('login')).render(
	  <StrictMode>
	<Router basename='/'>
	  <Routes>
		<Route index element={<Navigate to= "/login"/>} />
		<Route path="/login" element={<Login/>}/>
		<Route path="/signup" element={<Signup/>}/>
	  </Routes>
	</Router>
  </StrictMode>
);


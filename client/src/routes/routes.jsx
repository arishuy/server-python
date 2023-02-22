import React from 'react'
import { Route, Routes } from "react-router-dom";
import DashBoard from '../pages/DashBoard';
import Login from '../pages/Login';
import Register from '../pages/Register';

const routes = () => {
  return (
    <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default routes
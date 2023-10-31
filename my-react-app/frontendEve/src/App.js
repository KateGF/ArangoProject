import React from 'react';
import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage, SignUpPage, Menu, Amigos, Publicacion, AdminCuenta} from "./Routes.js"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/publicacion" element={<Publicacion />} />
        <Route path="/amigos" element={<Amigos />} />
        <Route path="/adminCuenta" element={<AdminCuenta />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

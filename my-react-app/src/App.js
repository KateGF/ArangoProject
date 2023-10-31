

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage, Menu, Posts, AdminCuenta } from "./Routes.js"
import MainMenu from "./Menu";
const App = () => {
  return (
    <BrowserRouter>
      <MainMenu />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/adminCuenta" element={<AdminCuenta />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;

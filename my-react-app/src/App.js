

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage, Menu, Posts } from "./Routes.js"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;

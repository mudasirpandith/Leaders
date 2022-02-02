import "./App.css";
import React from "react";
import "react-modern-drawer/dist/index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/userRegister/login";
import Forget from "./components/userRegister/forgotpassword";
import Home from "./components/home";
import Register from "./components/userRegister/register";
import Physics from "./components/subjects/physics";
import Chemistry from "./components/subjects/chemisrty";
import Biology from "./components/subjects/biology";
import Test from "./components/test/test";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/forget" element={<Forget />} />
        <Route path="/test/physics" element={<Physics />} />
        <Route path="/test/chemistry" element={<Chemistry />} />
        <Route path="/test/biology" element={<Biology />} />{" "}
        <Route path="/test/subjectcode/:testId" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;

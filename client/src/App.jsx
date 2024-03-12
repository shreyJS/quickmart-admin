import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<SignIn/>}/>
        <Route path="/sign-up" element ={<SignUp/>}/>
        <Route path="/dashboard" element ={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

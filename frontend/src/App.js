import "./App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardPost from "./components/CardPost";
import Card from "antd/es/card/Card";
import NewHelp from "./pages/NewHelp";
import Blogs from "./pages/Blogs";
import Signup from "./pages/Signup"
import Signin from './pages/Signin'

const { Meta } = Card;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/newhelp" element={<NewHelp />} />
          <Route path="/blogs" element = {<Blogs />} />
          <Route path="/signup" element = {<Signup />}/>
          <Route path="/signin" element = {<Signin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

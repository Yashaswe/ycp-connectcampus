import "./App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardPost from "./components/CardPost";
import Card from "antd/es/card/Card";
import NewHelp from "./pages/NewHelp";
import Blogs from "./pages/Blogs";

const { Meta } = Card;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/newhelp" element={<NewHelp />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

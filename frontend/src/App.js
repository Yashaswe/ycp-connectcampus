import "./App.css";
import React from "react";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card from "antd/es/card/Card";
import NewHelp from "./pages/NewHelp";
import Signup from "./pages/Signup"
import Signin from './pages/Signin'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/newhelp" element={<NewHelp />} />
          <Route path="/signup" element = {<Signup />}/>
          <Route path="/signin" element = {<Signin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

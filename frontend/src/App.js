import "./App.css";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserOutlined, MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Menu, Button, Layout, Card, Tag, FloatButton } from "antd";

import NewHelp from "./pages/NewHelp";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UserPage from "./pages/UserPage";
import Profile from "./pages/Profile"
// import Inbox from "./pages/Inbox";

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />}>
          <Route path="/" element={<Main />} />
          <Route path="/newhelp" element={<NewHelp />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path = "/inbox" element = {<Inbox />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

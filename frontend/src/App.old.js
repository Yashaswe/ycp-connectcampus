import "./App.css";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserOutlined, MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Menu, Button, Layout, Card, Tag, FloatButton } from "antd";

import NewHelp from "./pages/NewHelp";
import Blogs from "./pages/Blogs";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UserPage from "./pages/UserPage";

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
function App() {
  let menuData = [
    { name: "Emergency", icon: <UserOutlined />, link: "/" },
    { name: "Find Task", link: "/" },
    { name: "Profile", icon: <UserOutlined /> },
    { name: "Inbox", icon: <MessageOutlined /> },
    { name: "New Post", icon: <PlusOutlined />, link: "/newhelp" },
  ];

  return (
    <BrowserRouter>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {menuData.map((item) => (
              <Menu.Item>
                <Link to={item.link}>
                  {item.icon}
                  {item.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/newhelp" element={<NewHelp />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
          <Footer style={{ textAlign: "center" }}>
            Yashaswe, Sanij, Truc, Prabesh
          </Footer>
        </Layout>
        <Outlet />
      </Layout>
      <Routes>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

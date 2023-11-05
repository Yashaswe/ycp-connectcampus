import React, { useState, useEffect, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Menu, Button, Layout, Card, Tag, FloatButton } from "antd";
import CardPost from "../components/CardPost";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

export default function Main() {
  const [data,setData]=useState([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/products/all-products");
      setData(response.data.message);
    } catch (err) {
      console.log(err);
    }
  },[data]);
  useEffect(() => {
    fetchData();
  }, [setData]) ;
  let postinfo = {
    title: "Task",
    price: 322.0,
    description3: "sdlf",
    description:
      "dlghsldgjslIf you're looking for randomIf you're looIf you're looking for random paragraphs, you've come to the right place. When a random word or a random senking for random paragraphs, you've come to the right place. When a random word or a random sen paragraphs, you've come to the right place. When a random word or a random sen",
    description2:
      "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.",
    location: "Bullet Hole",
  };
  return (
    <Content
      style={{
        margin: "24px 16px 0",
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "white",
        }}
      >
        <CardPost postinfo={postinfo} />
        <CardPost postinfo={postinfo} />
        <CardPost postinfo={postinfo} />
        <CardPost postinfo={postinfo} />
      </div>
      {/* <FloatButton onClick={() => console.log("click")} /> */}
      <Link to="/newhelp">
        <FloatButton
          className="addPost"
          icon={<PlusOutlined />}
          type="primary"
          style={{ right: 100, width: 60, height: 60 }}
          tooltip={<div>New Help</div>}
        />
      </Link>
    </Content>
  );
}

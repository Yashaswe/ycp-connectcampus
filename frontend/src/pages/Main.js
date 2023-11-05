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

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);


  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post("/products/all-products",{
        token:localStorage.getItem("authToken")
      });
      setData(response.data.message);
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  const handleClick = () => {
    // Update the state variable
    setCount(count + 1);
  };

  useEffect(() => {
    fetchData();
  }, [setData,setCount]);

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
        {data.length > 0 ? (
          data.map((postinfo, index) => (
            <CardPost handleClick={handleClick} key={postinfo.id} postinfo={postinfo} data={data[index]} />
          ))
        ) : (
          <>data is loading....</>
        )}
      </div>

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

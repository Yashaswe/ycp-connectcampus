import "./App.css";
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  MessageOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Button, Layout, Card, Tag, FloatButton } from "antd";
import CardPost from "./components/CardPost";

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

function App() {
  let postinfo = {
    title: "Task",
    description:
      "dlghsldgjslIf you're looking for randomIf you're looIf you're looking for random paragraphs, you've come to the right place. When a random word or a random senking for random paragraphs, you've come to the right place. When a random word or a random sen paragraphs, you've come to the right place. When a random word or a random sen",
    description2:
      "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.",
    location: "Bullet Hole",
  };
  return (
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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { name: "Emergency", icon: <UserOutlined /> },
            { name: "Find Task" },
            { name: "Profile", icon: <UserOutlined /> },
            { name: "", icon: <MessageOutlined /> },
          ].map((nav, index) => ({
            key: String(index + 1),
            icon: nav.icon,
            label: nav.name,
          }))}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content
          style={{
            margin: "24px 16px 0",
            top: 0,
            bottom: 0,
            // position: "fixed",
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
          <FloatButton onClick={() => console.log("click")} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Yashaswe, Sanij, Truc, Prabesh
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;

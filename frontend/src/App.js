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
import { Avatar, Menu, Button, Layout, Card } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

function App() {
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
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
            }}
          >
            <Button>Hello</Button>
            <Card
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  // <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                  <UserOutlined />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card style={{ width: 300, marginTop: 16 }}></Card>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Yashaswe, Sanij, Truc, Prabesh
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;

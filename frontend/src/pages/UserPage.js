import { useEffect } from "react";
import {
  UserOutlined,
  MessageOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import NewHelp from "./NewHelp";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Main from "./Main";
import { Avatar, Menu, Button, Layout, Card, Tag, FloatButton } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const UserPage = () => {
  let menuData = [
    { name: "Emergency", link: "/emergency" },
    { name: "Find Task", link: "/" },
    { name: "Profile", link: "/profile", icon: <UserOutlined /> },
    { name: "Inbox", icon: <MessageOutlined />, link: "/inbox" },
    { name: "New Post", icon: <PlusOutlined />, link: "/newhelp" },
  ];
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  console.log(authToken, "TOKEN");

  useEffect(() => {
    if (!authToken) {
      navigate("/signup");
    }
  }, []);
  return (
    <>
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
                  <> </>
                  {item.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/signup");
            }}
            icon={<LogoutOutlined style={{ color: "red" }} />}
            style={{
              right: 0,
              // left: "50%",
              alignItems: "center",
              justifyContent: "center",
              bottom: "0px",
              position: "absolute",
              borderRadius: "0",
              margin: "5px",
            }}
          ></Button>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Outlet />
          <Footer style={{ textAlign: "center" }}>
            Yashaswe, Sanij, Truc, Prabesh
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default UserPage;

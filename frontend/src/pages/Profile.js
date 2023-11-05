import {
  Avatar,
  Row,
  Button,
  List,
  Col,
  Divider,
  Progress,
  Card,
  Layout,
  FloatButton,
} from "antd";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const { Header, Content, Footer, Sider } = Layout;
const Profile = () => {
  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post("/authentication/user", {
        token: token,
      });
      setData(response.data.user);
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    console.log("inside");
    fetchData();
  }, [setData]);

  return (
      <Content
      style={{
        margin: "24px 16px 0",
        top: 0,
        bottom: 0,
        textAlign: "center",
        height: "100vh",
      }}
    >
     {data? <Row gutter={16}>
        <Col md={4} sm={24}>
      <Card>
        <div className="d-flex flex-column align-items-center text-center"> 
        <Avatar size={150} src={data.profileImage} alt="Admin" />
        <div className="mt-3">
          <h2>{data.name}</h2>
           <p className="text-secondary mb-1">{data.email}</p>
        </div>
       </div>
      </Card>
      </Col>
      </Row>:<h1>Loading.....</h1>}
    </Content>
    
  );
};

export default Profile;

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
      console.log("dataaa", localStorage.getItem("authToken"));
      // const response = await axios.get("/authentication/user", {
      //   token: localStorage.getItem("authToken"),
      // });
      // console.log(response.data);
      // setData(response.data.message);
    } catch (err) {
      console.log(err);
    }
  });
  useEffect(() => {
    console.log("inside");
    fetchData();
  }, []);

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
      {/* <Row gutter={16}>
        <Col md={4} sm={24}> */}
      <Card>
        {/* <div className="d-flex flex-column align-items-center text-center"> */}
        {/* <Avatar size={150} src={data.profileImage} alt="Admin" /> */}
        <div className="mt-3">
          {/* <h2>{data.name}</h2> */}
          {/* <p className="text-secondary mb-1">{data.email}</p> */}
        </div>
        {/* </div> */}
      </Card>
      {/* </Col>
      </Row> */}
    </Content>
  );
};

export default Profile;

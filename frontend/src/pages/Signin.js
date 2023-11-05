import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Signin() {
  const { loginWithRedirect } = useAuth0();
  const navigate=useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (isAuthenticated) {
    console.log(user);
  }
  const onFinish = async(values) => {
    const obj={
      "email":values.email,
      "password":values.password
    }

    try{
      const response=await axios.post("/authentication/login",obj)
      if(response){
        localStorage.setItem("email", response.data.email)
        localStorage.setItem("name", response.data.userName)
        localStorage.setItem("authToken",response.data.accessToken)
        navigate("/")
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              Log in!
            </Button>
            <span>
              Don't have an account? {" "}
              <Link to="/signup">
                <a href="">Sign up!</a>
              </Link>
            </span>
            <span>
              <Button
                onClick={() => loginWithRedirect()}
                style={{backgroundColor: "#8983d4", color: "#fefefe"}}
                type="danger"
              >
                Log in with Auth0
              </Button>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}

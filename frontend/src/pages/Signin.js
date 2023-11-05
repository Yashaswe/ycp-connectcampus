import React from "react";
import { Link,useNavigate } from "react-router-dom";

import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Signin() {
  const navigate=useNavigate();
  const onFinish = async(values) => {
    const obj={
      "email":values.email,
      "password":values.password
    }

    try{
      const response=await axios.post("/authentication/login",obj)
      console.log(response.data)
      if(response){
        localStorage.setItem("authToken",response.data.accessToken)
        navigate("/")
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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
              Don't have an account?
              <Link to="/signup">
                <a href="">Sign up!</a>
              </Link>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/authentication/signup", {
        email: values.email,
        name: values.name,
        password: values.password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/");
      }

      //store
    } catch (err) {
      console.log(err);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
        name="signup"
        className="signup-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your College E-mail!",
            },
          ]}
          hasFeedback
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Full name"
          />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Should be less than 5MB!"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password, minimum character is 6!",
              min: 6,
              max: 24,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          placeholder="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
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
              Sign up!
            </Button>
            <span>
              Already have an account?{" "}
              <Link to="/signin">
                <a href="">Log in</a>
              </Link>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

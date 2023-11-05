import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";

export default function NewHelp() {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    location: "",
  });

  const handleFormSubmit = () => {
    // You can perform actions with the form data here, e.g., send it to a server.
    console.log("Form Data:", formData);
  };

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  return (
    <Content
      style={{
        margin: "24px 16px 0",
        top: 0,
        bottom: 0,
        // position: "fixed",
      }}
    >
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "100vh",
      // }}
      >
        <h1>Post a Task</h1>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 100,
          }}
          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 1000,
          }}
        >
          <Form.Item name="title">
            <Input
              placeholder="Title"
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="description">
            <Input.TextArea
              placeholder="Description"
              rows={5}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="price">
            <InputNumber
              placeholder="Price"
              prefix={<span style={{ color: "#A9A9AC" }}>$</span>}
              onChange={(value) => handleInputChange("price", value)}
            />
          </Form.Item>

          <Form.Item label="Category">
            <Select onChange={(value) => handleInputChange("category", value)}>
              <Select.Option value="Pickup">Pickup</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Transportation">
                Transportation
              </Select.Option>
              <Select.Option value="Pet">Pet</Select.Option>
              <Select.Option value="Book">Loan Book</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="location">
            <Input
              prefix={
                <EnvironmentOutlined
                  className="site-form-item-icon"
                  style={{ color: "#A9A9AC" }}
                />
              }
              placeholder="Location"
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
}

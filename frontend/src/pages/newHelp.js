import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';

export default function NewHelp() {

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        category: '',
        location: '',
      });
    
      const handleFormSubmit = () => {
        // You can perform actions with the form data here, e.g., send it to a server.
        console.log('Form Data:', formData);
      };
    
      const handleInputChange = (key, value) => {
        setFormData({
          ...formData,
          [key]: value,
        });
      };
  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 100,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 1000,
      }}
    >
      <Form.Item label="Title">
      <Input onChange={(e) => handleInputChange('title', e.target.value)}/>
      </Form.Item>

      <Form.Item label="Description">
      <Input.TextArea onChange={(e) => handleInputChange('description', e.target.value)}/>
      </Form.Item>

      <Form.Item label="Price">
        <InputNumber onChange={(value) => handleInputChange('price', value)}/>
      </Form.Item>

      <Form.Item label="Category">
        <Select onChange={(value) => handleInputChange('category', value)}>
          <Select.Option value="Pickup">Pickup</Select.Option>
          <Select.Option value="Medical">Medical</Select.Option>
          <Select.Option value="Transportation">Transportation</Select.Option>
          <Select.Option value="Pet">Pet</Select.Option>
          <Select.Option value="Book">Loan Book</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Location">
        <Input onChange={(e) => handleInputChange('location', e.target.value)}/>
      </Form.Item>  

      <Form.Item>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
       </Form.Item>

    </Form>
    </div>
  );
}
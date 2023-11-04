import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';

export default function NewHelp() {

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
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
        <Input />
      </Form.Item>

      <Form.Item label="Description">
      <Input.TextArea />
      </Form.Item>

      <Form.Item label="Price">
        <InputNumber />
      </Form.Item>

      <Form.Item label="Category">
        <Select>
          <Select.Option value="Pickup">Pickup</Select.Option>
          <Select.Option value="Pickup">Medical</Select.Option>
          <Select.Option value="Pickup">Transportation</Select.Option>
          <Select.Option value="Pickup">Pet</Select.Option>
          <Select.Option value="Pickup">Loan Book</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Location">
        <Input />
      </Form.Item>  

      <Form.Item >
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
       </Form.Item>

    </Form>
    </div>
  );
}
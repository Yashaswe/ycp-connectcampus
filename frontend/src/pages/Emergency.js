import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Typography, Table } from "antd";
import { Content } from "antd/es/layout/layout";

const { Text, Paragraph } = Typography;

const Emergency = () => {
  const [data, setData] = useState([]);
  const fetchData = useCallback(() => {
    setData([
      {
        departmentName: "Campus Safety",
        phoneNumber: "223-223-223",
      },
      {
        departmentName: "Bullet Express",
        phoneNumber: "223-223-223",
      },
      {
        departmentName: "CUB",
        phoneNumber: "223-223-223",
      },
    ]);
  });
  const columns = [
    {
      title: "Department Name",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];
  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/emergencies/get-all");
  //     setData(response.data.emergencies);
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //     throw new Error("could not fetch all emergencies");
  //   }
  // }, [data]);
  useEffect(() => {
    setData([
      {
        departmentName: "Campus Safety",
        phoneNumber: "223-223-223",
      },
      {
        departmentName: "Bullet Express",
        phoneNumber: "223-543-452",
      },
      {
        departmentName: "CUB",
        phoneNumber: "223-432-932",
      },
    ]);
  }, [setData]);
  console.log(data);
  return (
    <Content
      style={{
        margin: "24px 16px 0",
        top: 0,
        bottom: 0,
      }}
    >
      <h1>Emergency contacts</h1>
      <div>
        <Table dataSource={data} columns={columns} size={"small"} />
      </div>
    </Content>
  );
};

export default Emergency;

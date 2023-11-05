import React, { useState } from "react";
import { EnvironmentFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Tag, Typography, Flex } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Text, Paragraph } = Typography;

const CardPost = ({ postinfo, data }) => {
  const categoryColor = {
    Pickup: "#f50",
    Medical: "#2db7f5",
    Transportation: "#87d068",
    Pet: "#108ee9",
    Book: "#800080",
  };
  const [showMore, setShowMore] = useState(true);
  const handleExpand = () => {
    setShowMore(!showMore);
  };
  function handleSubmit() {
    const productId = data.id;
    const productName = data.title;
    console.log(productId)
  }

  if (!postinfo) return <></>;
  return (
    <Card
      style={{ width: 800, marginTop: 16 }}
      actions={[
        <Tag
          color={categoryColor[postinfo.category]}
          style={{ float: "left", marginLeft: "10px" }}
        >
          {postinfo.category}
        </Tag>,
      ]}
      // actions={[
      //   <SettingOutlined key="setting" />,
      //   <EditOutlined key="edit" />,
      //   <EllipsisOutlined key="ellipsis" />,
      // ]}
    >
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          // <UserOutlined />
        }
        title={
          <Flex justify={"space-between"}>
            <div>{postinfo.title}</div>
            <div>${postinfo.price}</div>
          </Flex>
        }
        description={[
          <div>
            <p>
              <EnvironmentFilled style={{ color: "#ea4335" }} />
              {postinfo.location}
            </p>
            <Paragraph
              ellipsis={{
                rows: showMore ? 3 : 0,
                symbol: "",
              }}
            >
              {postinfo.description}
            </Paragraph>
            {postinfo.description.length > 300 && (
              <Text
                onClick={handleExpand}
                style={{
                  color: "blue", // Link color
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {showMore ? "Show More" : "Show Less"}
              </Text>
            )}
          </div>,
        ]}
      />
      
      <Button type="primary" style={{ float: "right" }} onClick={handleSubmit}>
        Accept
      </Button>
    </Card>
  );
};
export default CardPost;

import React, { useState } from "react";
import { EnvironmentFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Tag, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;

const CardPost = ({ postinfo }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  if (!postinfo) return <></>;
  return (
    <Card
      style={{ width: 800, marginTop: 16 }}
      actions={[
        <Tag color="#f50" style={{ float: "left", marginLeft: "10px" }}>
          Tag 1
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
        title={postinfo.title}
        description={[
          <div>
            <p>
              <EnvironmentFilled style={{ color: "#ea4335" }} />
              {postinfo.location}
            </p>
            <Text
              ellipsis={!showMore}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {postinfo.description}
            </Text>
            {postinfo.description.length > 354 && (
              <button onClick={toggleShowMore}>
                {showMore ? "Show Less" : "Show More"}
              </button>
            )}
          </div>,
        ]}
        style={{ height: 200 }}
      />

      <Button type="primary" style={{ float: "right" }}>
        Accept
      </Button>
    </Card>
  );
};
export default CardPost;

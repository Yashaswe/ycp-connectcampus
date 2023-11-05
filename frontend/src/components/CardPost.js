import React, { useEffect, useState } from "react";
import { EnvironmentFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Tag, Typography, Flex } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Text, Paragraph } = Typography;


const CardPost = ({ postinfo, data ,handleClick}) => {
  const [update,setUpdate]=useState(false)
  const categoryColor = {
    Pickup: "#f50",
    Medical: "#2db7f5",
    Transportation: "#87d068",
    Pet: "#108ee9",
    Book: "#800080",
  };
  const [showMore, setShowMore] = useState(false);
  const handleExpand = () => {
    setShowMore(!showMore);
  };

  async function handleSubmit() {

    
    const productId = data.id;
    const productName = data.title;
    
    const token = localStorage.getItem("authToken")
    try{
      const response=await axios.post("/products/update-product",{
        id:productId,
        token:token
      })
      
     
      setUpdate(true)
      console.log(response.data)
    

    }catch(err){
      console.log(err)
    }
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
      
      {
        update?<Button type="primary" style={{ float: "right" }} disabled>
        Taken
      </Button>:postinfo.isAccepted?<Button type="primary" style={{ float: "right" }} disabled>
        Taken
      </Button>:<Button type="primary" style={{ float: "right" }} onClick={handleSubmit}>
        Accept
      </Button>
      }
    </Card>
  );
};
export default CardPost;

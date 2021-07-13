import { Layout, List } from "antd";
import { Link } from "react-router-dom";
import Rome from "../images/Rome.jpg";
import Bermuda from "../images/Bermuda.png";

const { Content } = Layout;

const listData = [
  {
    name: "Rome",
    image: Rome,
    description: "Flights from Toronto starting at $820",
    content: "Explore ancient history in Italy's capital city.",
  },
  {
    name: "Bermuda",
    image: Bermuda,
    description: "Flights from Toronto starting at $490",
    content:
      "Relax on the beach with an all-inclusive trip from Travel Orange.",
  },
];
const Destinations = () => {
  return (
    <Layout height="500px" style={{ backgroundColor: "white" }}>
      <h2 style={{ marginLeft: "20px" }}>Destinations</h2>
      <Content
        style={{
          height: "500px",
        }}
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={(item) => {
            const link = `/destination/${item.name}`;
            return (
              <List.Item
                key={item.name}
                extra={
                  <Link to={link}>
                    <img width={272} alt="logo" src={item.image} />
                  </Link>
                }
              >
                <Link to={link}>
                  <List.Item.Meta
                    title={item.name}
                    description={item.description}
                  />
                  <p style={{ color: "rgba(0, 0, 0, 0.85)" }}>{item.content}</p>
                </Link>
              </List.Item>
            );
          }}
        ></List>
      </Content>
    </Layout>
  );
};

export default Destinations;

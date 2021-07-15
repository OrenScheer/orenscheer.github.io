import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, List, Card, Typography } from "antd";
import {
  faPlaneDeparture,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import Rome from "../images/Rome.jpg";
import Sydney from "../images/Sydney.jpg";
import Sandusky from "../images/Sandusky.jpg";

const { Content } = Layout;
const { Text } = Typography;

const flights = [
  { title: "Ottawa → Rome", dates: "Aug. 7 - Aug. 16, 2021", image: Rome },
  { title: "Ottawa → Sydney", dates: "Sep. 21 - Oct. 3, 2021", image: Sydney },
  {
    title: "Ottawa → Sandusky",
    dates: "May 20 - May 26, 2022",
    image: Sandusky,
  },
];

const Bookings = () => {
  return (
    <Layout height="500px" style={{ backgroundColor: "white" }}>
      <h2 style={{ marginLeft: "20px" }}>My Bookings</h2>
      <Content
        style={{
          height: "500px",
          marginLeft: "20px",
        }}
      >
        <h3 style={{ marginTop: "20px" }}>
          <FontAwesomeIcon
            icon={faPlaneDeparture}
            style={{ marginRight: "10px" }}
          />
          Flights
        </h3>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={flights}
          renderItem={(flight) => (
            <List.Item>
              <Card
                cover={
                  <img alt="logo" src={flight.image} width={270} height={180} />
                }
                style={{ width: 270 }}
              >
                <Card.Meta
                  title={<Text>{flight.title}</Text>}
                  description={
                    <>
                      {flight.dates}
                      <mark
                        style={{
                          backgroundColor: "rgba(255, 229, 143, 0.6)",
                          color: "rgba(0, 0, 0, 0.6)",
                          marginLeft: "10px",
                        }}
                      >
                        Roundtrip
                      </mark>
                    </>
                  }
                ></Card.Meta>
              </Card>
            </List.Item>
          )}
        />
        <h3 style={{ marginTop: "20px" }}>
          <FontAwesomeIcon icon={faSuitcase} style={{ marginRight: "10px" }} />
          Vacations
        </h3>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={flights}
          renderItem={(flight) => (
            <List.Item>
              <Card title={flight.title}>Card content</Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Bookings;

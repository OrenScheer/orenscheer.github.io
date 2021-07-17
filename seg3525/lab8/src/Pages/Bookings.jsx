import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, List, Card, Typography } from "antd";
import {
  faPlaneDeparture,
  faSuitcase,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import Rome from "../images/Rome.jpg";
import Sydney from "../images/Sydney.jpg";
import Sandusky from "../images/Sandusky.jpg";
import BermudaResort from "../images/BermudaResort.jpg";
import NorwegianFjords from "../images/NorwegianFjords.jpg";

const { Title } = Typography;

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

const vacations = [
  {
    title: "Bermuda Resort",
    dates: "Jul. 10 - Jul. 18, 2021",
    image: BermudaResort,
  },
  {
    title: "Norwegian Fjords Cruise",
    dates: "Sep. 1 - Sep 10, 2021",
    image: NorwegianFjords,
  },
];

const Bookings = () => {
  return (
    <Layout height="500px" style={{ backgroundColor: "white" }}>
      <Title level={3} style={{ marginLeft: "20px" }}>
        <FontAwesomeIcon
          icon={faCalendarCheck}
          style={{ marginRight: "15px" }}
        />
        My Bookings
      </Title>
      <Content
        style={{
          marginLeft: "20px",
        }}
      >
        <Title level={4} style={{ marginTop: "20px", fontWeight: "normal" }}>
          <FontAwesomeIcon
            icon={faPlaneDeparture}
            style={{ marginRight: "10px" }}
          />
          Flights
        </Title>
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
        <Title level={4} style={{ marginTop: "20px", fontWeight: "normal" }}>
          <FontAwesomeIcon icon={faSuitcase} style={{ marginRight: "10px" }} />
          Vacations
        </Title>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={vacations}
          renderItem={(vacation) => (
            <List.Item>
              <Card
                cover={
                  <img
                    alt="logo"
                    src={vacation.image}
                    width={270}
                    height={180}
                  />
                }
                style={{ width: 270 }}
              >
                <Card.Meta
                  title={<Text>{vacation.title}</Text>}
                  description={vacation.dates}
                ></Card.Meta>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Bookings;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, List, Card, Typography } from "antd";
import {
  faPlaneDeparture,
  faSuitcase,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Rome from "../images/Rome.jpg";
import Sydney from "../images/Sydney.jpg";
import Sandusky from "../images/Sandusky.jpg";
import BermudaResort from "../images/BermudaResort.jpg";
import NorwegianFjords from "../images/NorwegianFjords.jpg";

const { Title } = Typography;

const { Content } = Layout;
const { Text } = Typography;

const flights = [
  {
    id: "1",
    title: "Ottawa → Rome",
    dates: { eng: "Aug. 7 - Aug. 16, 2021", fra: "Août 7 - août 16, 2021" },
    image: Rome,
  },
  {
    id: "2",
    title: "Ottawa → Sydney",
    dates: { eng: "Sep. 21 - Oct. 3, 2021", fra: "Sep. 21 - oct. 3, 2021" },
    image: Sydney,
  },
  {
    id: "3",
    title: "Ottawa → Sandusky",
    dates: { eng: "May 20 - May 26, 2022", fra: "Mai 20 - mai 26, 2022" },
    image: Sandusky,
  },
];

const vacations = [
  {
    title: { eng: "Bermuda resort stay", fra: "Séjour aux Bermudes" },
    dates: { eng: "Jul. 10 - Jul. 18, 2021", fra: "Juil. 10 - Juil. 18, 2021" },
    image: BermudaResort,
  },
  {
    title: {
      eng: "Norwegian fjords cruise",
      fra: "Croisière des fjords norvégiens",
    },
    dates: { eng: "Sep. 1 - Sep. 10, 2021", fra: "Sep. 1 - sep. 20, 2021" },
    image: NorwegianFjords,
  },
];

const text = {
  myBookings: { eng: "My Bookings", fra: "Mes réservations" },
  flights: { eng: "Flights", fra: "Vols" },
  vacations: { eng: "Vacations", fra: "Vacances" },
  roundtrip: { eng: "Roundtrip", fra: "Aller-retour" },
};

const Bookings = ({ language }) => {
  return (
    <Layout height="500px" style={{ backgroundColor: "white" }}>
      <Title level={3} style={{ marginLeft: "20px" }}>
        <FontAwesomeIcon
          icon={faCalendarCheck}
          style={{ marginRight: "15px" }}
        />
        {text.myBookings[language]}
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
          {text.flights[language]}
        </Title>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={flights}
          renderItem={(flight) => (
            <Link to={`/booking/${flight.id}`}>
              <List.Item>
                <Card
                  cover={
                    <img
                      alt="logo"
                      src={flight.image}
                      width={270}
                      height={180}
                    />
                  }
                  style={{ width: 280 }}
                >
                  <Card.Meta
                    title={<Text>{flight.title}</Text>}
                    description={
                      <>
                        {flight.dates[language]}
                        <mark
                          style={{
                            backgroundColor: "rgba(255, 229, 143, 0.6)",
                            color: "rgba(0, 0, 0, 0.6)",
                            marginLeft: "10px",
                          }}
                        >
                          {text.roundtrip[language]}
                        </mark>
                      </>
                    }
                  ></Card.Meta>
                </Card>
              </List.Item>
            </Link>
          )}
        />
        <Title level={4} style={{ marginTop: "20px", fontWeight: "normal" }}>
          <FontAwesomeIcon icon={faSuitcase} style={{ marginRight: "10px" }} />
          {text.vacations[language]}
        </Title>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={vacations}
          renderItem={(vacation) => (
            <Link to="/">
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
                  style={{ width: 280 }}
                >
                  <Card.Meta
                    title={<Text>{vacation.title[language]}</Text>}
                    description={vacation.dates[language]}
                  ></Card.Meta>
                </Card>
              </List.Item>
            </Link>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Bookings;

import { Layout, List, Typography } from "antd";
import { Link } from "react-router-dom";
import Rome from "../images/Rome.jpg";
import BermudaResort from "../images/BermudaResort.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const { Title, Text } = Typography;
const { Content } = Layout;

const listData = [
  {
    name: { eng: "Rome", fra: "Rome" },
    image: Rome,
    price: 820,
    content: {
      eng: "Explore ancient history in Italy's capital city.",
      fra: "Explorer de l'histoire ancienne dans la capitale d'Italie.",
    },
  },
  {
    name: { eng: "Bermuda", fra: "Bermudes" },
    image: BermudaResort,
    price: 490,
    content: {
      eng: "Relax on the beach with Travel Orange.",
      fra: "Se relaxer à la plage avec Voyages Oranges.",
    },
  },
];

const text = {
  flightsFromToronto: {
    eng: "Flights from Toronto starting at",
    fra: "Vols de Toronto commençant à",
  },
};

const Destinations = ({ language }) => {
  return (
    <Layout height="500px" style={{ backgroundColor: "white" }}>
      <Title level={3} style={{ marginLeft: "20px" }}>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          style={{ marginRight: "15px" }}
        />
        Destinations
      </Title>
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
            const link = `/destination/${item.name.eng}`;
            return (
              <List.Item
                key={item.name.eng}
                extra={
                  <Link to={link}>
                    <img width={272} alt="logo" src={item.image} />
                  </Link>
                }
              >
                <Link to={link}>
                  <List.Item.Meta
                    title={item.name[language]}
                    description={
                      language === "eng"
                        ? `${text.flightsFromToronto[language]} $${item.price}.`
                        : `${text.flightsFromToronto[language]} ${item.price}$.`
                    }
                  />
                  <Text style={{ color: "rgba(0, 0, 0, 0.85)" }}>
                    {item.content[language]}
                  </Text>
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

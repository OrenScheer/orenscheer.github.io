import { useHistory, useParams } from "react-router-dom";
import { Layout, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;

const { Content } = Layout;

const destinations = {
  Rome: {
    video: "https://www.youtube.com/embed/JKT4n1rHV-0",
    map: "https://www.google.com/maps/d/embed?mid=1m4wGOiG0fnYO_urg47zXJAREYt8",
  },
  Bermuda: {
    video: "https://www.youtube.com/embed/4bYq8XTxHZU",
    map: "https://www.google.com/maps/d/embed?mid=1c8TrK_BMiNvJhpaZjlXqL3e9RCA",
  },
};

const DestinationDetails = () => {
  const { place } = useParams();
  const history = useHistory();
  let destination = destinations[place];

  if (!destination) {
    history.replace("/notfound");
  }

  return (
    <>
      {destination && (
        <Layout height="500px" style={{ backgroundColor: "white" }}>
          <Title level={3} style={{ marginLeft: "20px" }}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginRight: "15px" }}
            />
            {`Destination Spotlight: ${place}`}
          </Title>
          <Content
            style={{
              height: "500px",
              marginLeft: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <iframe
              width="400"
              height="250"
              src={destination.video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <iframe
              width="600"
              height="450"
              src={destination.map}
              title="Attractions map"
            />
          </Content>
        </Layout>
      )}
    </>
  );
};

export default DestinationDetails;

import { useHistory, useParams } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;

const destinations = {
  Rome: { video: "https://www.youtube.com/embed/JKT4n1rHV-0" },
  Bermuda: { video: "https://www.youtube.com/embed/4bYq8XTxHZU" },
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
          <h2
            style={{ marginLeft: "20px" }}
          >{`Destination Spotlight: ${place}`}</h2>
          <Content
            style={{
              height: "500px",
              marginLeft: "20px",
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
          </Content>
        </Layout>
      )}
    </>
  );
};

export default DestinationDetails;

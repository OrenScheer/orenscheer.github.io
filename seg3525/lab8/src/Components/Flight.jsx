import { List, Avatar, Typography } from "antd";
import AirCanada from "../images/AirCanada.png";
import AirTransat from "../images/AirTransat.png";
import Alitalia from "../images/Alitalia.png";
import "../App.less";

const { Text } = Typography;

const logoSources = {
  "Air Canada": AirCanada,
  "Air Transat": AirTransat,
  Alitalia: Alitalia,
};

const text = { roundtrip: { eng: "Roundtrip", fra: "Aller-retour" } };

const Flight = ({ language, flight, button = null }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar
            src={logoSources[flight.airline]}
            style={{ marginTop: "8px" }}
          />
        }
        title={
          flight.from +
          flight.through.map((stop) => " → " + stop).join("") +
          " → " +
          flight.to
        }
        description={
          <>
            <mark
              style={{
                backgroundColor: "rgba(255, 229, 143, 0.6)",
                color: "rgba(0, 0, 0, 0.6)",
                marginRight: "10px",
              }}
            >
              {text.roundtrip[language]}
            </mark>
            {flight.airline}
          </>
        }
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          {language === "eng" ? `$${flight.price}` : `${flight.price}$`}
        </Text>
        {button}
      </div>
    </List.Item>
  );
};

export default Flight;

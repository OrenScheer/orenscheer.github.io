import { List, Avatar } from "antd";
import AirCanada from "../images/AirCanada.png";
import AirTransat from "../images/AirTransat.png";
import Alitalia from "../images/Alitalia.png";

const logoSources = {
  "Air Canada": AirCanada,
  "Air Transat": AirTransat,
  Alitalia: Alitalia,
};

const Flight = ({ flight, button = null }) => {
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
        description={flight.airline}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{`$${flight.price}`}</h1>
        {button}
      </div>
    </List.Item>
  );
};

export default Flight;

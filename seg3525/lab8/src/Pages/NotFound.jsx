import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { faMapPin, faMap } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;

const NotFound = () => {
  const history = useHistory();
  return (
    <div>
      <FontAwesomeIcon icon={faMapPin} color="orange" size="10x" />
      <FontAwesomeIcon
        icon={faMap}
        color="orange"
        size="10x"
        style={{ marginLeft: "30px" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Title level={2}>You're off the map!</Title>
        <Title level={4} style={{ marginTop: "0" }}>
          404 Not Found
        </Title>
        <Button onClick={() => history.push("/")} type="default">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

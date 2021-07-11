import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { faMapPin, faMap } from "@fortawesome/free-solid-svg-icons";

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
        <h1>You're off the map!</h1>
        <h3>404 Not Found</h3>
        <Button onClick={() => history.push("/")} type="default">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

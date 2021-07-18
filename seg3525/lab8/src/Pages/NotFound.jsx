import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { faMapPin, faMap } from "@fortawesome/free-solid-svg-icons";

const text = {
  offTheMap: { eng: "You're off the map!", fra: "Vous êtes perdu!" },
  notFound: { eng: "404 Not Found", fra: "404 Page introuvable" },
  home: { eng: "Home", fra: "Page d'acceuil" },
};

const NotFound = ({ language }) => {
  return (
    <Result
      icon={
        <>
          <FontAwesomeIcon icon={faMapPin} color="orange" size="10x" />
          <FontAwesomeIcon
            icon={faMap}
            color="orange"
            size="10x"
            style={{ marginLeft: "30px" }}
          />
        </>
      }
      title={text.offTheMap[language]}
      subTitle={text.notFound[language]}
      extra={
        <Link to="/">
          <Button type="primary">{text.home[language]}</Button>
        </Link>
      }
    />
  );
};

export default NotFound;

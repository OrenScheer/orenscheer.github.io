import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faAtlas } from "@fortawesome/free-solid-svg-icons";

const Logo = ({ fontSize }) => {
  return (
    <Link to="/">
      <div>
        <h1
          style={{
            color: "orange",
            fontSize: fontSize,
          }}
        >
          <FontAwesomeIcon icon={faAtlas} style={{ marginRight: "10px" }} />
          Travel Orange
        </h1>
      </div>
    </Link>
  );
};

export default Logo;

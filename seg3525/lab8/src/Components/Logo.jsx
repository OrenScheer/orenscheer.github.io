import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faAtlas } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "antd";

const { Title } = Typography;

const Logo = ({ style }) => {
  return (
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <div style={style}>
        <Title
          level={2}
          style={{
            color: "orange",
            margin: "0",
            pading: "0",
          }}
        >
          <FontAwesomeIcon icon={faAtlas} style={{ marginRight: "10px" }} />
          Travel Orange
        </Title>
      </div>
    </Link>
  );
};

export default Logo;

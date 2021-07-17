import { Link, useLocation } from "react-router-dom";
import "./App.less";
import { Layout, Menu } from "antd";
import Routes from "./components/Routes";
import Logo from "./components/Logo";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faMapMarkerAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const navs = (location) => {
  if (location.includes("destination")) {
    return ["destinations"];
  } else if (location.includes("booking")) {
    return ["bookings"];
  } else if (
    location === "/" ||
    location.includes("flight") ||
    location.includes("book")
  ) {
    return ["home"];
  }
  return [];
};

const App = () => {
  const { Header, Content } = Layout;
  const location = useLocation().pathname;
  const [activeNavs, setActiveNavs] = useState();

  useEffect(() => {
    setActiveNavs(navs(location));
  }, [location]);

  return (
    <Layout className="layout">
      <Header
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Logo style={{ marginLeft: "15px" }} />
        <Menu
          theme="light"
          mode="horizontal"
          className="menu-bar"
          selectedKeys={activeNavs}
          style={{
            width: "400px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Menu.Item key="home">
            <Link to="/">
              <FontAwesomeIcon
                icon={faSearch}
                style={{ marginRight: "10px" }}
              />
              Search
            </Link>
          </Menu.Item>
          <Menu.Item key="destinations">
            <Link to="/destinations">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginRight: "10px" }}
              />
              Destinations
            </Link>
          </Menu.Item>
          <Menu.Item key="bookings">
            <Link to="/bookings">
              <FontAwesomeIcon
                icon={faCalendarCheck}
                style={{ marginRight: "10px" }}
              />
              My Bookings
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "20px 20px" }} theme="light">
        <div className="site-layout-content">
          <Routes />
        </div>
      </Content>
    </Layout>
  );
};

export default App;

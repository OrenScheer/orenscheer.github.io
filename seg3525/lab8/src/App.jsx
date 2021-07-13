import { Link, useLocation } from "react-router-dom";
import "./App.less";
import { Layout, Menu } from "antd";
import Routes from "./components/Routes";
import Logo from "./components/Logo";
import { useEffect, useState } from "react";

const navs = (location) => {
  if (location === "/") {
    return ["home"];
  } else if (location.includes("destination")) {
    return ["destinations"];
  } else if (location.includes("booking")) {
    return ["bookings"];
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
        <Logo fontSize="28px" />
        <Menu
          theme="light"
          mode="horizontal"
          className="menu-bar"
          selectedKeys={activeNavs}
        >
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="destinations">
            <Link to="/destinations">Destinations</Link>
          </Menu.Item>
          <Menu.Item key="bookings">
            <Link to="/bookings">My Bookings</Link>
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

import { Link, useLocation } from "react-router-dom";
import "./App.less";
import { Layout, Menu, Select } from "antd";
import Routes from "./components/Routes";
import Logo from "./components/Logo";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrangeCounty from "./images/OrangeCounty.jpg";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import frCA from "antd/lib/locale-provider/fr_CA";

import {
  faCalendarCheck,
  faMapMarkerAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const { Header, Content } = Layout;
const { Option } = Select;

const navs = (location) => {
  if (location.includes("destination")) {
    return "destinations";
  } else if (location.includes("booking")) {
    return "bookings";
  } else if (
    location === "/" ||
    location.includes("flight") ||
    location.includes("book")
  ) {
    return "home";
  }
  return null;
};

const imageNavs = (location) => {
  if (location === "/") {
    return "home";
  }
};

const backgroundImages = { home: OrangeCounty };
const locales = { eng: enUS, fra: frCA };
const text = {
  search: { eng: "Search", fra: "Recherche" },
  destinations: { eng: "Destinations", fra: "Destinations" },
  myBookings: { eng: "My Bookings", fra: "Mes réservations" },
};

const App = () => {
  const location = useLocation().pathname;
  const [activeNavs, setActiveNavs] = useState();
  const [backgroundImage, setBackgroundImage] = useState();
  const [language, setLanguage] = useState("eng");
  const [locale, setLocale] = useState("en_US");

  useEffect(() => {
    setActiveNavs([navs(location)]);
    setBackgroundImage(backgroundImages[imageNavs(location)]);
  }, [location]);

  return (
    <ConfigProvider locale={locale}>
      <Layout className="layout">
        <Header
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Logo language={language} style={{ marginLeft: "15px" }} />
          <Menu
            theme="light"
            mode="horizontal"
            className="menu-bar"
            selectedKeys={activeNavs}
            style={{
              width: "600px",
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
                {text.search[language]}
              </Link>
            </Menu.Item>
            <Menu.Item key="destinations">
              <Link to="/destinations">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ marginRight: "10px" }}
                />
                {text.destinations[language]}
              </Link>
            </Menu.Item>
            <Menu.Item key="bookings">
              <Link to="/bookings">
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  style={{ marginRight: "10px" }}
                />
                {text.myBookings[language]}
              </Link>
            </Menu.Item>
            <Menu.Item key="language">
              <Select
                defaultValue="eng"
                style={{ width: "100px" }}
                value={language}
                onChange={(value) => {
                  setLanguage(value);
                  setLocale(locales[value]);
                }}
              >
                <Option value="eng">English</Option>
                <Option value="fra">Français</Option>
              </Select>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            padding: "20px 20px",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
          theme="light"
        >
          <div
            className="site-layout-content"
            style={{ backgroundColor: backgroundImage ? "" : "white" }}
          >
            <Routes language={language} />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

import { BrowserRouter as Router } from "react-router-dom";
import "./App.less";
import { Layout, Menu } from "antd";
import Routes from "./Components/Routes";
import Logo from "./Components/Logo";

const App = () => {
  const { Header, Content } = Layout;

  return (
    <Router>
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
            defaultSelectedKeys={["2"]}
          >
            {new Array(3).fill(null).map((_, index) => {
              const key = index + 1;
              return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
            })}
          </Menu>
        </Header>
        <Content style={{ padding: "20px 20px" }} theme="light">
          <div className="site-layout-content">
            <Routes />
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;

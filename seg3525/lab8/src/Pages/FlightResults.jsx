import Layout from "antd/lib/layout/layout";
import { useLocation } from "react-router-dom";
import FlightForm from "../Components/FlightForm";

const { Sider, Content } = Layout;

const FlightResults = () => {
  return (
    <Layout height="500px">
      <Sider width="400px" theme="light" style={{ backgroundColor: "#f0f2f5" }}>
        <div
          style={{
            width: "400px",
            height: "300px",
            float: "left",
            marginTop: "20px",
          }}
        >
          <FlightForm values={useLocation().state}></FlightForm>
        </div>
      </Sider>
      <Content style={{ height: "500px", backgroundColor: "white" }}></Content>
    </Layout>
  );
};

export default FlightResults;

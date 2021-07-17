import { Button, Tabs } from "antd";
import FlightForm from "../components/FlightForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "antd";

const { TabPane } = Tabs;

const Home = () => {
  const [form] = Form.useForm();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "60%",
      }}
    >
      <div>
        <Button type="primary" style={{ width: "200px", height: "50px" }}>
          Show Top Rated Vacations
        </Button>
      </div>
      <div style={{ fontSize: "25px" }}>OR</div>
      <div
        style={{
          width: "400px",
          height: "500px",
          border: "1px solid lightgrey",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          centered
          style={{ backgroundColor: "white" }}
        >
          <TabPane
            tab={
              <span>
                <FontAwesomeIcon
                  icon={faPlaneDeparture}
                  style={{ marginRight: "5px" }}
                />
                Flights
              </span>
            }
            key="1"
          >
            <FlightForm
              form={form}
              submitButton={
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              }
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FontAwesomeIcon
                  icon={faSuitcase}
                  style={{ marginRight: "5px" }}
                />
                Vacations
              </span>
            }
            key="2"
          ></TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
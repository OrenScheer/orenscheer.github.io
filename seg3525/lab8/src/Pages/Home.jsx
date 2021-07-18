import { Button, Tabs } from "antd";
import FlightForm from "../components/FlightForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "antd";

const { TabPane } = Tabs;

const text = {
  flights: { eng: "Flights", fra: "Vols" },
  vacations: { eng: "Vacations", fra: "Vacances" },
  search: { eng: "Search", fra: "Chercher" },
};

const Home = ({ language }) => {
  const [form] = Form.useForm();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      {/* <div>
        <Button type="primary" style={{ width: "200px", height: "50px" }}>
          Show Top Rated Vacations
        </Button>
      </div>
      <div style={{ fontSize: "25px" }}>OR</div> */}
      <div
        style={{
          width: "400px",
          height: "500px",
          border: "1px solid lightgrey",
          backgroundColor: "rgba(255,255,255,0.995)",
          borderRadius: "10px",
        }}
      >
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab={
              <span>
                <FontAwesomeIcon
                  icon={faPlaneDeparture}
                  style={{ marginRight: "5px" }}
                />
                {text.flights[language]}
              </span>
            }
            key="1"
          >
            <FlightForm
              language={language}
              form={form}
              submitButton={
                <Button type="primary" htmlType="submit">
                  {text.search[language]}
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
                {text.vacations[language]}
              </span>
            }
            key="2"
          ></TabPane>
        </Tabs>
      </div>
      {/* <div style={{ marginLeft: "20px" }}>
        <img src={OrangeCounty} alt="Orange County, CA" height="500px" />
      </div> */}
    </div>
  );
};

export default Home;

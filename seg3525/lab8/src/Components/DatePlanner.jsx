import moment from "moment";
import { Typography, Button, Popover, Input, TimePicker } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const { Title } = Typography;
const { Search } = Input;

const DatePlannerSection = ({ startTime, defaultTimeString }) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [timeValue, setTimeValue] = useState(
    moment(defaultTimeString, "H:mm A")
  );
  const [timeValueString, setTimeValueString] = useState(defaultTimeString);
  const [events, setEvents] = useState([]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title level={5}>{startTime}</Title>
      <Popover
        trigger="click"
        title="Add an event"
        placement="bottom"
        visible={visible}
        onVisibleChange={(visible) => {
          setVisible(visible);
          setInputValue("");
          setTimeValue(moment(defaultTimeString, "H:mm A"));
          setTimeValueString(defaultTimeString);
        }}
        content={
          <div style={{ width: "250px" }}>
            <TimePicker
              value={timeValue}
              format={"H:mm A"}
              showNow={false}
              minuteStep={5}
              onChange={(time) => {
                setTimeValue(time);
                setTimeValueString(time.format("H:mm A"));
              }}
            />
            <Search
              enterButton="Add"
              onSearch={() => {
                setVisible(false);
                setEvents((oldArray) => [
                  ...oldArray,
                  [timeValueString, inputValue],
                ]);
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        }
      >
        <Button
          type="primary"
          shape="circle"
          icon={<FontAwesomeIcon icon={faPlus} />}
          title="Add an event"
          onClick={() => setVisible(true)}
        />
      </Popover>
      <div>
        {[...events]
          .sort((a, b) => {
            let timeA = moment(a[0], "H:mm A");
            let timeB = moment(b[0], "H:mm A");
            if (moment(timeA).isBefore(timeB)) {
              return -1;
            } else if (moment(timeB).isBefore(timeA)) {
              return 1;
            }
            return 0;
          })
          .map((event) => (
            <p>{`${event[0]} : ${event[1]}`}</p>
          ))}
      </div>
    </div>
  );
};

const DatePlanner = ({ date }) => {
  return (
    <div
      style={{
        height: "500px",
        width: "300px",
        backgroundColor: "rgb(240, 242, 245)",
        borderRadius: "20px",
      }}
    >
      <Title level={4} style={{ textAlign: "center", marginTop: "5px" }}>
        {date.format("MMM D, YYYY")}
      </Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "400px",
        }}
      >
        {
          <DatePlannerSection
            startTime="Morning (before noon)"
            defaultTimeString="8:00 AM"
          />
        }
        {
          <DatePlannerSection
            startTime="Afternoon (before 6 PM)"
            defaultTimeString="3:00 PM"
          />
        }
        {
          <DatePlannerSection
            startTime="Evening (before midnight)"
            defaultTimeString="7:00 PM"
          />
        }
      </div>
    </div>
  );
};

export default DatePlanner;

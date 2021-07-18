import moment from "moment";
import "moment/locale/fr-ca";
import "moment/locale/en-ca";
import { Typography, Button, Popover, Input, TimePicker } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const { Title } = Typography;
const { Search } = Input;

const text = {
  beforeNoon: { eng: "Morning (before noon)", fra: "Matin (avant midi)" },
  afterNoon: { eng: "Afternoon (before 6 PM)", fra: "Après-midi (avant 18 h)" },
  evening: { eng: "Evening (before midnight)", fra: "Soir (avant minuit)" },
  addAnEvent: { eng: "Add an event", fra: "Ajouter un événement" },
  add: { eng: "Add", fra: "Ajouter" },
  placeholder: { eng: "Description", fra: "Description" },
};

const DatePlannerSection = ({ startTime, defaultTimeString, language }) => {
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
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {text.addAnEvent[language]}
          </div>
        }
        placement="bottom"
        visible={visible}
        onVisibleChange={(visible) => {
          setVisible(visible);
          setInputValue("");
          setTimeValue(moment(defaultTimeString, "H:mm A"));
          setTimeValueString(defaultTimeString);
        }}
        content={
          <div
            style={{
              width: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TimePicker
              value={timeValue}
              format={"H:mm A"}
              showNow={false}
              minuteStep={5}
              onChange={(time) => {
                setTimeValue(time);
                setTimeValueString(time.format("H:mm A"));
              }}
              style={{ marginBottom: "10px" }}
            />
            <Search
              enterButton={text.add[language]}
              placeholder={text.placeholder[language]}
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
          title={text.addAnEvent[language]}
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

const DatePlanner = ({ date, language }) => {
  const [locale, setLocale] = useState(language === "eng" ? "en-ca" : "fr-ca");
  useEffect(() => {
    setLocale(language === "eng" ? "en-ca" : "fr-ca");
  }, [language]);
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
        {moment(date)
          .locale(locale)
          .format("MMM D, YYYY")
          .replace(/^\w/, (c) => c.toUpperCase())}
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
            language={language}
            startTime={text.beforeNoon[language]}
            defaultTimeString="8:00 AM"
          />
        }
        {
          <DatePlannerSection
            language={language}
            startTime={text.afterNoon[language]}
            defaultTimeString="3:00 PM"
          />
        }
        {
          <DatePlannerSection
            language={language}
            startTime={text.evening[language]}
            defaultTimeString="7:00 PM"
          />
        }
      </div>
    </div>
  );
};

export default DatePlanner;

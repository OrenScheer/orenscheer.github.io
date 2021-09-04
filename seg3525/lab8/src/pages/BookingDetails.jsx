import { useHistory, useParams, Link } from "react-router-dom";
import { Layout, Typography, Button, notification } from "antd";
import DatePlanner from "../components/DatePlanner";
import moment from "moment";

const { Content } = Layout;
const { Title } = Typography;

const trips = {
  1: {
    title: "Ottawa → Rome",
    departureDate: moment("2021-08-07"),
    returnDate: moment("2021-08-16"),
  },
  2: {
    title: "Ottawa → Sydney",
    departureDate: moment("2021-09-21"),
    returnDate: moment("2021-10-03"),
  },
  3: {
    title: "Ottawa → Sandusky",
    departureDate: moment("2022-05-20"),
    returnDate: moment("2022-05-26"),
  },
};

const text = {
  cancel: { eng: "Cancel", fra: "Annuler" },
  save: { eng: "Save", fra: "Sauvegarder" },
  saved: {
    eng: "Your plan was saved.",
    fra: "Votre plan a été sauvegardé.",
  },
  notSaved: {
    eng: "Your plan was not saved.",
    fra: "Votre plan n'a pas été sauvegardé.",
  },
};

const BookingDetails = ({ language }) => {
  const { id } = useParams();
  const history = useHistory();
  const trip = trips[id];

  if (!id || !trip) {
    history.replace("/notfound");
  }

  return (
    <>
      {trip && (
        <Layout height="500px" style={{ backgroundColor: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={3} style={{ marginLeft: "20px" }}>
              {trip.title}
            </Title>
            <div>
              <Link to="/bookings">
                <Button
                  onClick={() =>
                    notification.info({
                      message: text.notSaved[language],
                      placement: "bottomRight",
                    })
                  }
                >
                  {text.cancel[language]}
                </Button>
              </Link>
              <Link to="/bookings">
                <Button
                  type="primary"
                  style={{ marginLeft: "20px" }}
                  onClick={() =>
                    notification.success({
                      message: text.saved[language],
                      placement: "bottomRight",
                    })
                  }
                >
                  {text.save[language]}
                </Button>
              </Link>
            </div>
          </div>
          <Content
            style={{
              height: "500px",
              marginLeft: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <DatePlanner language={language} date={trip.departureDate} />
            <DatePlanner
              language={language}
              date={moment(trip.departureDate).add(1, "days")}
            />
            <DatePlanner
              language={language}
              date={moment(trip.departureDate).add(2, "days")}
            />
            <DatePlanner
              language={language}
              date={moment(trip.departureDate).add(3, "days")}
            />
          </Content>
        </Layout>
      )}
    </>
  );
};

export default BookingDetails;

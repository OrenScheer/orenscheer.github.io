import { useHistory, useParams } from "react-router-dom";
import { Layout, Typography } from "antd";
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

const BookingDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const trip = trips[id];

  if (!id || !trip) {
    history.replace("/notfound");
  }

  console.log(moment(trip.departureDate).add(2, "days"));
  console.log(trip.departureDate);

  return (
    <>
      {trip && (
        <Layout height="500px" style={{ backgroundColor: "white" }}>
          <Title level={3} style={{ marginLeft: "20px" }}>
            {trip.title}
          </Title>
          <Content
            style={{
              height: "500px",
              marginLeft: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <DatePlanner date={trip.departureDate} />
            <DatePlanner date={moment(trip.departureDate).add(1, "days")} />
            <DatePlanner date={moment(trip.departureDate).add(2, "days")} />
            <DatePlanner date={moment(trip.departureDate).add(3, "days")} />
          </Content>
        </Layout>
      )}
    </>
  );
};

export default BookingDetails;

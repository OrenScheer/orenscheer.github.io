import { Layout } from "antd";

const { Content } = Layout;

const Bookings = () => {
  return (
    <Layout height="500px" style={{ backgroundColor: "white" }}>
      <h2 style={{ marginLeft: "20px" }}>My Bookings</h2>
      <Content
        style={{
          height: "500px",
          marginLeft: "20px",
        }}
      ></Content>
    </Layout>
  );
};

export default Bookings;

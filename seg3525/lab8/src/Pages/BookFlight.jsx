import { useHistory, useLocation } from "react-router-dom";
import { Layout, Steps, Button, Form, Input, DatePicker } from "antd";
import { useState } from "react";
import Flight from "../Components/Flight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const { Sider, Content } = Layout;
const { Step } = Steps;

const BookFlight = () => {
  const flight = useLocation().state;
  const [currentStep, setCurrentStep] = useState(0);
  const history = useHistory();
  const [form] = Form.useForm();

  return (
    <Layout height="500px">
      <Sider
        width="400px"
        theme="light"
        style={{
          backgroundColor: "#f0f2f5",
          display: "flex",
          flexDirection: "vertical",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Steps direction="vertical" current={currentStep}>
          <Step title="Details" />
          <Step title="Payment" />
          <Step title="Review" />
          <Step title="Confirmation" />
        </Steps>
      </Sider>
      <Content
        style={{
          height: "500px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            height: "100%",
          }}
        >
          <div>
            <Button
              type="link"
              onClick={() => history.goBack()}
              disabled={currentStep !== 0}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ marginRight: "8px" }}
              />
              Select a different flight
            </Button>

            <div style={{ marginLeft: "20px" }}>
              <Flight flight={flight} />
            </div>
          </div>
          <Form
            labelCol={{ span: 3 }}
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "79%",
            }}
            form={form}
            validateMessages={{
              required: "This field is required.",
              types: {
                email: "Enter your email in the format email@example.com",
              },
            }}
          >
            {currentStep === 0 && (
              <div>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input placeholder="email@example.com" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true },
                    {
                      pattern: /^\d{3}-\d{3}-\d{4}$/,
                      message: "Enter your phone in the format 555-555-5555",
                    },
                  ]}
                >
                  <Input placeholder="555-555-5555" />
                </Form.Item>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[{ required: true }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="Passport No."
                  name="passport"
                  rules={[
                    { required: true },
                    {
                      pattern: /^[a-zA-Z]{2}\d{6}$/,
                      message:
                        "Enter your passport number in the format AA555555",
                    },
                  ]}
                >
                  <Input placeholder="AA555555" />
                </Form.Item>
              </div>
            )}
            {currentStep === 1 && (
              <div>
                <Form.Item
                  label="Credit Card"
                  name="creditCard"
                  rules={[
                    { required: true },
                    {
                      pattern: /^\d{4} \d{4} \d{4} \d{4}$/,
                      message:
                        "Enter your credit card in the format 5555 5555 5555 5555",
                    },
                  ]}
                >
                  <Input placeholder="5555 5555 5555 5555" />
                </Form.Item>
                <Form.Item
                  label="Expiry"
                  name="expiry"
                  rules={[{ required: true }]}
                >
                  <DatePicker picker="month" />
                </Form.Item>
                <Form.Item
                  label="CVV"
                  name="cvv"
                  rules={[
                    { required: true },
                    {
                      pattern: /^\d{3}$/,
                      message: "Enter your CVV in the format 555",
                    },
                  ]}
                  tooltip={{
                    title: "The three-number code on the back of your card.",
                    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
                  }}
                >
                  <Input.Password placeholder="555" />
                </Form.Item>
              </div>
            )}
            {currentStep === 2 && <div></div>}
            {currentStep === 3 && <div></div>}
            <div>
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep < 1 || currentStep > 2}
              >
                Previous
              </Button>
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep > 2}
                style={{ marginLeft: "20px" }}
              >
                {currentStep < 2 ? "Next" : "Confirm"}
              </Button>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default BookFlight;

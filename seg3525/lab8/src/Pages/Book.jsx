import { useHistory, useLocation } from "react-router-dom";
import {
  Layout,
  Steps,
  Button,
  Form,
  Input,
  DatePicker,
  Typography,
} from "antd";
import { useRef, useState } from "react";
import Flight from "../components/Flight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faQuestionCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const { Sider, Content } = Layout;
const { Step } = Steps;
const { Title, Text } = Typography;

const text = {
  details: { eng: "Details", fra: "Renseignements" },
  payment: { eng: "Payment", fra: "Paiement" },
  review: { eng: "Review", fra: "Vérification" },
  selectADifferentFlight: {
    eng: "Select a different flight",
    fra: "Choisir un vol différent",
  },
  next: { eng: "Next", fra: "Prochaine" },
  previous: { eng: "Previous", fra: "Précédent" },
  book: { eng: "Book", fra: "Réserver" },
  email: { eng: "Email", fra: "Courriel" },
  phone: { eng: "Phone", fra: "Téléphone" },
  firstName: { eng: "First name", fra: "Prénom" },
  lastName: { eng: "Last name", fra: "Nom de famille" },
  name: { eng: "Name", fra: "Nom" },
  dateOfBirth: { eng: "Date of birth", fra: "Date de naissance" },
  passportNumber: { eng: "Passport no.", fra: "Num. de passport" },
  required: { eng: "This field is required", fra: "Ce champ est obligatoire" },
  emailValidation: {
    eng: "Enter your email in the format email@example.com",
    fra: "Entrer votre courriel dans le format email@example.com",
  },
  phoneValidation: {
    eng: "Enter your phone in the format 555-555-5555",
    fra: "Entrer votre téléphone dans le format 555-555-5555",
  },
  passportNumberValidation: {
    eng: "Enter your passport number in the format AA555555",
    fra: "Entrer votre numéro de passport dans le format AA555555",
  },
  creditCard: {
    eng: "Credit Card",
    fra: "Carte de crédit",
  },
  expiry: {
    eng: "Expiry",
    fra: "Expiration",
  },
  cvv: {
    eng: "CVV",
    fra: "CVV",
  },
  creditCardValidation: {
    eng: "Enter your credit card in the format 5555 5555 5555 5555",
    fra: "Entrer votre carte de crédit dans le format 5555 5555 5555 5555",
  },
  cvvValidation: {
    eng: "Enter your CVV in the format 555",
    fra: "Entrer votre CVV dans le format 555",
  },
  cvvTooltip: {
    eng: "The three-number code on the back of your card",
    fra: "Le code de trois nombres à l'arrière de votre carte",
  },
  bookingComplete: {
    eng: "Your booking is complete.",
    fra: "Votre réservation est faite.",
  },
  cancellationPolicy: {
    eng: "You can cancel within the next 24 hours.",
    fra: "Vous pouvez annuler votre réservation dans les 24 heures qui suivent.",
  },
  viewBookings: {
    eng: "View bookings",
    fra: "Voir réservations",
  },
};

const Book = ({ language }) => {
  const flight = useLocation().state;
  const [currentStep, setCurrentStep] = useState(0);
  const creditCardRef = useRef(null);
  const history = useHistory();
  const [form] = Form.useForm();

  const formAction = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
        if (currentStep + 1 === 1) {
          creditCardRef.current.focus({
            cursor: "start",
          });
        }
      })
      .catch(() => {});
  };

  return (
    <Layout height="500px">
      <Sider
        width="200px"
        theme="light"
        style={{
          display: "flex",
          flexDirection: "vertical",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Steps direction="vertical" current={currentStep}>
          <Step title={text.details[language]} />
          <Step title={text.payment[language]} />
          <Step title={text.review[language]} />
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
              {text.selectADifferentFlight[language]}
            </Button>

            <div style={{ marginLeft: "20px" }}>
              <Flight language={language} flight={flight} />
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
              required: text.required[language],
              types: {
                email: text.emailValidation[language],
              },
            }}
          >
            {currentStep === 0 && (
              <div>
                <Form.Item
                  label={text.email[language]}
                  name="email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input
                    placeholder="email@example.com"
                    onPressEnter={formAction}
                  />
                </Form.Item>
                <Form.Item
                  label={text.phone[language]}
                  name="phone"
                  rules={[
                    { required: true },
                    {
                      pattern: /^\d{3}-\d{3}-\d{4}$/,
                      message: text.phoneValidation[language],
                    },
                  ]}
                >
                  <Input placeholder="555-555-5555" onPressEnter={formAction} />
                </Form.Item>
                <Form.Item
                  label={text.firstName[language]}
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input onPressEnter={formAction} />
                </Form.Item>
                <Form.Item
                  label={text.lastName[language]}
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input onPressEnter={formAction} />
                </Form.Item>
                <Form.Item
                  name="dateOfBirth"
                  label={text.dateOfBirth[language]}
                  rules={[{ required: true }]}
                >
                  <DatePicker onPressEnter={formAction} />
                </Form.Item>
                <Form.Item
                  label={text.passportNumber[language]}
                  name="passport"
                  rules={[
                    { required: true },
                    {
                      pattern: /^[a-zA-Z]{2}\d{6}$/,
                      message: text.passportNumberValidation[language],
                    },
                  ]}
                >
                  <Input placeholder="AA555555" onPressEnter={formAction} />
                </Form.Item>
              </div>
            )}
            {currentStep === 1 && (
              <div>
                <Form.Item
                  label={text.creditCard[language]}
                  name="creditCard"
                  rules={[
                    { required: true },
                    {
                      pattern: /^\d{4} \d{4} \d{4} \d{4}$/,
                      message: text.creditCardValidation[language],
                    },
                  ]}
                >
                  <Input
                    placeholder="5555 5555 5555 5555"
                    onPressEnter={formAction}
                    ref={creditCardRef}
                  />
                </Form.Item>
                <Form.Item
                  label={text.expiry[language]}
                  name="expiry"
                  rules={[{ required: true }]}
                >
                  <DatePicker picker="month" onPressEnter={formAction} />
                </Form.Item>
                <Form.Item
                  label={text.cvv[language]}
                  name="cvv"
                  rules={[
                    { required: true },
                    {
                      pattern: /^\d{3}$/,
                      message: text.cvvValidation[language],
                    },
                  ]}
                  tooltip={{
                    title: text.cvvTooltip[language],
                    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
                  }}
                >
                  <Input.Password placeholder="555" onPressEnter={formAction} />
                </Form.Item>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <Title level={5}>{text.details[language]}</Title>
                <ul>
                  <li>
                    <Text strong>{`${text.email[language]}: `}</Text>
                    {form.getFieldValue("email")}
                  </li>
                  <li>
                    <Text strong>{`${text.phone[language]}: `}</Text>
                    {form.getFieldValue("phone")}
                  </li>
                  <li>
                    <Text strong>{`${text.name[language]}: `}</Text>
                    {`${form.getFieldValue("firstName")} ${form.getFieldValue(
                      "lastName"
                    )}`}
                  </li>
                  <li>
                    <Text strong>{`${text.dateOfBirth[language]}: `}</Text>
                    {form.getFieldValue("dateOfBirth").format().slice(0, 10)}
                  </li>
                  <li>
                    <Text strong>{`${text.passportNumber[language]}: `}</Text>
                    {form.getFieldValue("passport")}
                  </li>
                </ul>
                <Title level={5}>{text.payment[language]}</Title>
                <ul>
                  <li>
                    <Text strong>{`${text.creditCard[language]}: `}</Text>
                    {`**** **** **** ${form
                      .getFieldValue("creditCard")
                      .slice(15, 20)}`}
                  </li>
                  <li>
                    <Text strong>{`${text.expiry[language]}: `}</Text>
                    {form.getFieldValue("expiry").format().slice(0, 10)}
                  </li>
                  <li>
                    <Text strong>{`${text.cvv[language]}: `}</Text>
                    ***
                  </li>
                </ul>
                <Title level={5}>
                  {language === "eng"
                    ? `Your credit card ending in ${form
                        .getFieldValue("creditCard")
                        .slice(15, 20)} will be charged $${
                        flight.price
                      } at the end of the 24 hour cancellation period.`
                    : `À la fin de la période d'annulation de 24 heures, ${
                        flight.price
                      }$ sera pris de votre carte de crédit terminant avec ${form
                        .getFieldValue("creditCard")
                        .slice(15, 20)}.`}
                </Title>
              </div>
            )}
            {currentStep === 3 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="10x"
                  style={{ color: "green" }}
                />
                <Title
                  level={3}
                  style={{ textAlign: "center", marginTop: "12px" }}
                >
                  {text.bookingComplete[language]}
                  <br />
                  {language === "eng"
                    ? `You will receive a confirmation email at ${form.getFieldValue(
                        "email"
                      )} shortly.`
                    : `Vous recevrez bientôt un courriel de confirmation à ${form.getFieldValue(
                        "email"
                      )}.`}
                </Title>
                <Text style={{ marginBottom: "12px" }}>
                  {text.cancellationPolicy[language]}
                </Text>
                <Button
                  type="primary"
                  onClick={() => history.push("/bookings")}
                >
                  {text.viewBookings[language]}
                </Button>
              </div>
            )}
            <div>
              <Button
                type="default"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep < 1 || currentStep > 2}
              >
                {text.previous[language]}
              </Button>
              <Button
                type={currentStep === 2 ? "primary" : "default"}
                onClick={formAction}
                disabled={currentStep > 2}
                style={{ marginLeft: "20px" }}
              >
                {currentStep < 2 ? text.next[language] : text.book[language]}
              </Button>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Book;

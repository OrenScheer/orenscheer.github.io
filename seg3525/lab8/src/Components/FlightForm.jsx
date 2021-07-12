import { DatePicker, Form, Select, Checkbox, Col, Row } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const FlightForm = ({
  form,
  values = {},
  additionalFields = null,
  submitButton = null,
  handleParent = () => {},
}) => {
  let [departureDisabled, setDepartureDisabled] = useState(
    values.departAnytime
  );
  let [returnDisabled, setReturnDisabled] = useState(values.returnAnytime);
  const history = useHistory();

  values.departureDate = values.departureDate
    ? moment(values.departureDate)
    : null;
  values.returnDate = values.returnDate ? moment(values.returnDate) : null;

  const changeFormValues = (valuesChanged) => {
    if ("departureDate" in valuesChanged) {
      if (valuesChanged.departureDate >= form.getFieldValue("returnDate")) {
        form.setFieldsValue({ returnDate: null });
      }
    }
    if ("departAnytime" in valuesChanged) {
      setDepartureDisabled(form.getFieldValue("departAnytime"));
      form.setFieldsValue({ departureDate: null });
    }
    if ("returnAnytime" in valuesChanged) {
      setReturnDisabled(form.getFieldValue("returnAnytime"));
      form.setFieldsValue({ returnDate: null });
    }
    handleParent();
  };

  return (
    <Form
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={(fieldsValue) => {
        history.push("/flights", {
          from: fieldsValue["from"],
          to: fieldsValue["to"],
          departureDate: fieldsValue["departureDate"]
            ? fieldsValue["departureDate"].format()
            : null,
          departAnytime: fieldsValue["departAnytime"],
          returnDate: fieldsValue["returnDate"]
            ? fieldsValue["returnDate"].format()
            : null,
          returnAnytime: fieldsValue["returnAnytime"],
        });
      }}
      form={form}
      initialValues={values}
      onValuesChange={changeFormValues}
      validateMessages={{ required: "This field is required." }}
    >
      <Form.Item name="from" label="From" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="Ottawa">Ottawa</Select.Option>
          <Select.Option value="Toronto">Toronto</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="to" label="To" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="Rome">Rome</Select.Option>
        </Select>
      </Form.Item>
      <Row>
        <Col span={17}>
          <Form.Item
            name="departureDate"
            label="Departure date"
            labelAlign="left"
            labelCol={{ span: 9, offset: 1 }}
          >
            <DatePicker disabled={departureDisabled} />
          </Form.Item>
        </Col>
        <Col
          span={7}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form.Item name="departAnytime" valuePropName="checked">
            <Checkbox defaultChecked={values.departAnytime}>Anytime</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={17}>
          <Form.Item
            name="returnDate"
            label="Return date"
            labelAlign="left"
            labelCol={{ span: 7, offset: 3 }}
          >
            <DatePicker
              disabled={returnDisabled}
              disabledDate={(currentDate) =>
                currentDate < form.getFieldValue("departureDate")
              }
            />
          </Form.Item>
        </Col>
        <Col
          span={7}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form.Item name="returnAnytime" valuePropName="checked">
            <Checkbox defaultChecked={values.returnAnytime}>Anytime</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      {additionalFields}
      <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
        {submitButton}
      </Form.Item>
    </Form>
  );
};

export default FlightForm;

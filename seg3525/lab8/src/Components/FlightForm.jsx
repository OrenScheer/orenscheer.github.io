import { DatePicker, Form, Select, Checkbox, Col, Row } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const FlightForm = ({ values, submitButton }) => {
  let [departureDisabled, setDepartureDisabled] = useState(
    values.departAnytime
  );
  let [returnDisabled, setReturnDisabled] = useState(values.returnAnytime);
  const history = useHistory();
  const [form] = Form.useForm();

  values.departureDate = values.departureDate
    ? moment(values.departureDate)
    : null;
  values.returnDate = values.returnDate ? moment(values.returnDate) : null;

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
    >
      <Form.Item name="from" label="From">
        <Select>
          <Select.Option value="Ottawa">Ottawa</Select.Option>
          <Select.Option value="Toronto">Toronto</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="to" label="To">
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
            <DatePicker
              disabled={departureDisabled}
              onChange={(date) => {
                if (date >= form.getFieldValue("returnDate")) {
                  form.setFieldsValue({ returnDate: null });
                }
              }}
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
          <Form.Item name="departAnytime" valuePropName="checked">
            <Checkbox
              onChange={(e) => {
                setDepartureDisabled(e.target.checked);
                form.setFieldsValue({ departureDate: null });
              }}
            >
              Anytime
            </Checkbox>
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
            <Checkbox
              onChange={(e) => {
                setReturnDisabled(e.target.checked);
                form.setFieldsValue({ returnDate: null });
              }}
              defaultChecked={values.returnAnytime}
            >
              Anytime
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
        {submitButton}
      </Form.Item>
    </Form>
  );
};

export default FlightForm;

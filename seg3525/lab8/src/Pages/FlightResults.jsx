import Layout from "antd/lib/layout/layout";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Checkbox, Alert, List, Button, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import FlightForm from "../Components/FlightForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneSlash } from "@fortawesome/free-solid-svg-icons";
import Flight from "../Components/Flight";

const { Sider, Content } = Layout;

const flights = [
  { from: "Ottawa", to: "Toronto" },
  { from: "Toronto", to: "Rome" },
];

const getRoutes = (from, to, direct) => {
  if (direct && from === "Ottawa" && to === "Rome") {
    return [];
  } else if (from === "Ottawa") {
    return [
      {
        from: "Ottawa",
        to: "Rome",
        through: ["Toronto"],
        airline: "Air Canada",
        price: 950,
      },
      {
        from: "Ottawa",
        to: "Rome",
        through: ["Toronto"],
        airline: "Air Transat",
        price: 800,
      },
      {
        from: "Ottawa",
        to: "Rome",
        through: ["Montreal", "Paris"],
        airline: "Air Canada",
        price: 1090,
      },
      {
        from: "Ottawa",
        to: "Rome",
        through: ["Toronto", "London"],
        airline: "Alitalia",
        price: 900,
      },
    ];
  } else if (direct && from === "Toronto") {
    return [
      {
        from: "Toronto",
        to: "Rome",
        through: [],
        airline: "Air Canada",
        price: 860,
      },
      {
        from: "Toronto",
        to: "Rome",
        through: [],
        airline: "Air Transat",
        price: 820,
      },
      {
        from: "Toronto",
        to: "Rome",
        through: [],
        airline: "Air Canada",
        price: 920,
      },
    ];
  } else {
    return [
      {
        from: "Toronto",
        to: "Rome",
        through: [],
        airline: "Air Canada",
        price: 860,
      },
      {
        from: "Toronto",
        to: "Rome",
        through: [],
        airline: "Air Transat",
        price: 820,
      },
      {
        from: "Toronto",
        to: "Rome",
        through: [],
        airline: "Air Canada",
        price: 920,
      },
      {
        from: "Toronto",
        to: "Rome",
        through: ["Frankfurt"],
        airline: "Alitalia",
        price: 920,
      },
    ];
  }
};

const sortPriceAscending = (a, b) => {
  if (a.price > b.price) {
    return 1;
  } else if (b.price > a.price) {
    return -1;
  }
  return 0;
};

const sortPriceDescending = (a, b) => {
  if (b.price > a.price) {
    return 1;
  } else if (a.price > b.price) {
    return -1;
  }
  return 0;
};

const FlightResults = () => {
  const [form] = Form.useForm();
  const [filter] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);

  const history = useHistory();

  const sortResults = useCallback(
    (routes, sorter = "priceAscending") => {
      console.log(filter.getFieldValue("sort"));
      let copy = [...routes];
      if (sorter === "priceAscending") {
        copy.sort(sortPriceAscending);
      } else if (sorter === "priceDescending") {
        copy.sort(sortPriceDescending);
      }
      setResults(copy);
    },
    [filter]
  );

  useEffect(() => {
    sortResults(
      getRoutes(
        form.getFieldValue("from"),
        form.getFieldValue("to"),
        form.getFieldValue("directFlightsOnly")
      ),
      filter.getFieldValue("sort")
    );
  }, [sortResults, form, filter]);

  const update = () => {
    setOptions(
      flights.filter((flight) => flight.to === form.getFieldValue("to"))
    );
    sortResults(
      getRoutes(
        form.getFieldValue("from"),
        form.getFieldValue("to"),
        form.getFieldValue("directFlightsOnly")
      ),
      filter.getFieldValue("sort")
    );
  };

  const additionalFields = (
    <>
      <Form.Item
        name="directFlightsOnly"
        valuePropName="checked"
        wrapperCol={{ span: 14, offset: 7 }}
      >
        <Checkbox>Direct Flights Only</Checkbox>
      </Form.Item>
    </>
  );

  return (
    <Layout height="500px">
      <Sider width="400px" theme="light" style={{ backgroundColor: "#f0f2f5" }}>
        <div
          style={{
            width: "400px",
            height: "300px",
            float: "left",
            marginTop: "20px",
          }}
        >
          <FlightForm
            form={form}
            additionalFields={additionalFields}
            values={useLocation().state}
            handleParent={update}
          />
        </div>
      </Sider>
      <Content
        style={{
          height: "500px",
          backgroundColor: "white",
        }}
      >
        {results.length === 0 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Alert
              message={`There are no direct flights from ${form.getFieldValue(
                "from"
              )} to ${form.getFieldValue("to")}.`}
              description={
                <>
                  <p>You can fly direct from: </p>
                  <ul>
                    {options.map((option) => {
                      return (
                        <li
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            let changes = { from: option.from };
                            form.setFieldsValue(changes);
                            update(changes);
                          }}
                          key={option.from}
                        >
                          {option.from}
                        </li>
                      );
                    })}
                  </ul>
                </>
              }
              type="error"
              icon={
                <FontAwesomeIcon
                  icon={faPlaneSlash}
                  style={{ marginTop: "12px" }}
                />
              }
              showIcon
              style={{ width: "80%" }}
            />
          </div>
        )}
        {results.length > 0 && (
          <div style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Form
              initialValues={{ sort: "priceAscending" }}
              onValuesChange={(changedValues) => {
                sortResults(results, changedValues.sort);
              }}
              form={filter}
              style={{ marginLeft: "20px" }}
            >
              <Form.Item name="sort" label="Sort By">
                <Select>
                  <Select.Option value="priceAscending">
                    Price (low to high)
                  </Select.Option>
                  <Select.Option value="priceDescending">
                    Price (high to low)
                  </Select.Option>
                </Select>
              </Form.Item>
            </Form>
            <List
              style={{ marginLeft: "20px" }}
              itemLayout="horizontal"
              dataSource={results}
              renderItem={(flight) => (
                <Flight
                  flight={flight}
                  button={
                    <Button
                      style={{ marginLeft: "20px" }}
                      type="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/bookflight", flight);
                      }}
                    >
                      Book
                    </Button>
                  }
                />
              )}
            ></List>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default FlightResults;

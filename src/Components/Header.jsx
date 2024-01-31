// Header Component
import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";

import axios from "axios";
import { useDispatch } from "react-redux";
import { validateHeaderData } from "../utils/validation"; 

const Header = () => {
  const [error,setError]=useState(false)
  const [headerData, setHeaderData] = useState({
    vr_no: "",
    vr_date: "",
    ac_name: "",
    ac_amt: "",
    status: "",
  });
  const dispatch = useDispatch();

  const handleHeaderChange = (key, value) => {
    setHeaderData({ ...headerData, [key]: value });
  };

  const handleHeaderSubmit = async () => {
    // Validate header data
    if (validateHeaderData(headerData)) {
      try {
        // Make API call to insert data
        const response = await axios.post(
          "http://5.189.180.8:8010/header",
        headerData
          );
        
         
        // Dispatch an action with the response if needed
        dispatch({ type: "HEADER_SUBMITTED", payload: response.data });
      } catch (error) {
        // Handle API call error
        console.log(headerData);
        console.log("Error submitting header data:", error);
        // Display error message or take appropriate action
      }
    } else {
      setError(true)
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-3 mb-5 text-center">Sales Entry</h1>
        </Col>
      </Row>
      <Form>
        {
        error?
         <div className='text-danger'>All fields are required & Enter data in correct format  </div>:""
        }
        <Row>
          <Col className="col-4">
            <Form.Group controlId="formInvoiceNumber">
              <Form.Label>Invoice Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Invoice Number"
                onChange={(e) => handleHeaderChange("vr_no", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-4">
            <Form.Group controlId="formVrDate">
              <Form.Label>Voucher Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Voucher Date"
                onChange={(e) => handleHeaderChange("vr_date", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-4">
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Status"
                onChange={(e) => handleHeaderChange("status", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-6">
            <Form.Group controlId="formCustomerName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Customer Name"
                onChange={(e) => handleHeaderChange("ac_name", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-6">
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => handleHeaderChange("ac_amt", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleHeaderSubmit} className="my-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Header;

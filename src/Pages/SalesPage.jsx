import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Container, Button, Row, Col, Table } from "react-bootstrap";
import { validateHeaderData, validateDetailData } from "../utils/validation";

const SalesPage = () => {
  //Hooks
  
  const [itemDetails, SetItemDetails] = useState([]);
  const [error, setError] = useState(false);
  const [headerData, setHeaderData] = useState({
    vr_no: 0,
    vr_date: "",
    ac_name: "",
    ac_amt: 1,
    status: "",
  });
  const [detailData, setDetailData] = useState([
    {
      vr_no: "",
      sr_no: 0,
      item_code: "",
      item_name: "",
      description: "",
      qty: 0,
      rate: 0,
    },
  ]);

  useEffect(() => {
    //fetch data
    async function FetchData() {
      try {
        const response = await axios.get("http://5.189.180.8:8010/item");
        if (response.data) {
          SetItemDetails(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // GET CURRENT DATE
    const getCurrentDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      setHeaderData({ ...headerData, vr_date: `${year}-${month}-${day}` });
    };
    getCurrentDate();
    FetchData();
  }, []);

  // Header section functions
  const handleHeaderChange = (key, value) => {
    setHeaderData({ ...headerData, [key]: value });
    if (key == "vr_no") {
      const updatedData = [...detailData];
      updatedData[0][key] = value;
      setDetailData(updatedData);
     
    }
  };

  //detail table functions
  const handleDetailChange = (index, key, value) => {
    const updatedData = [...detailData];
    updatedData[index][key] = value;
    setDetailData(updatedData);
  };
  //Add new Row
  const handleAddRow = () => {
    if (validateDetailData(detailData)) {
      setDetailData((prevstate) => [
        ...detailData,
        {
          vr_no: headerData.vr_no,
          sr_no: prevstate[prevstate.length - 1].sr_no++,
          item_code: "",
          item_name: "",
          description: "",
          qty: "",
          rate: "",
        },
      ]);
    }
  };
  //Remove Row
  const handleRemoveRow = (index) => {
    const updatedData = [...detailData];
    updatedData.splice(index, 1);
    setDetailData(updatedData);
  };
  // Calculate Total Amount
  const calculateTotalAmount = () => {
    return detailData.reduce((total, row) => total + row.qty * row.rate, 0);
  };
  //Submit Data
  const handleDetailSubmit = async () => {
   
    if (validateHeaderData(headerData) && validateDetailData(detailData)) {
      try {
        // API call to insert data
        const response = await axios.post(
          "http://5.189.180.8:8010/header/multiple",
          {
            header_table: headerData,
            detail_table: detailData,
          }
        );
        if (response) {
          console.log(response);
          alert("submited");
          window.location.reload()
        }
      } catch (error) {
        console.log(
          `header Data :${headerData} ##### detailsData:${detailData}`
        );
        console.log("Error In submitting  data:", error);
      }
    } else {
      setError(true);
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
        {error ? (
          <div className="text-danger">
            All fields are required & Enter data in correct format
          </div>
        ) : (
          ""
        )}
        <Row>
          <Col className="col-4">
            <Form.Group controlId="formInvoiceNumber">
              <Form.Label>Invoice Number  {/* unique */}</Form.Label>
              <Form.Control
                type="text"
                value={headerData.vr_no}
                placeholder="Enter A unique Invoice Number"
                onChange={(e) => handleHeaderChange("vr_no", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-4">
            <Form.Group controlId="formVrDate">
              <Form.Label>Voucher Date</Form.Label>
              <Form.Control
                type="date"
                value={headerData.vr_date}
                readOnly
                onChange={(e) => handleHeaderChange("vr_date", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-4">
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                onChange={(e) => handleHeaderChange("status", e.target.value)}
              >
                <option value="">select</option>
                <option value="A">Active</option>
                <option value="I">Inactive</option>
              </Form.Select>
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
                disabled
                value={calculateTotalAmount()}
                onChange={(e) => handleHeaderChange("ac_amt", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* details sec */}
      <Container>
        <h2 className="text-center mt-5 mb-3">Details</h2>
        <Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {detailData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Form.Select
                      value={row.item_code}
                      onChange={(e) =>
                        handleDetailChange(index, "item_code", e.target.value)
                      }
                    >
                      <option value="">select</option>
                      {itemDetails.map((item) => (
                        <option key={item.item_code}>{item.item_code}</option>
                      ))}
                    </Form.Select>
                  </td>

                  <td>
                    <Form.Select
                      type="text"
                      value={row.item_name}
                      onChange={(e) =>
                        handleDetailChange(index, "item_name", e.target.value)
                      }
                    >
                      <option value="">select</option>
                      {itemDetails.map((item) => (
                        <option key={item.item_name}>{item.item_name}</option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={row.description}
                      onChange={(e) =>
                        handleDetailChange(index, "description", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={row.qty}
                      onChange={(e) =>
                        handleDetailChange(index, "qty", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={row.rate}
                      onChange={(e) =>
                        handleDetailChange(index, "rate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveRow(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            variant="success"
            className="me-2 mt-2"
            onClick={handleAddRow}
          >
            Add Row
          </Button>
          <Button
            variant="primary"
            className="me-2 mt-2"
            onClick={handleDetailSubmit}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default SalesPage;

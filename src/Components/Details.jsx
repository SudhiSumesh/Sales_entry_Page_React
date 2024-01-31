// Details Component
import React, { useState } from 'react';
import { Container,Form, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { validateDetailData } from '../utils/validation'; 
const Details = () => {
  const [error,setError]=useState(false)
  const [detailData, setDetailData] = useState([{ item_code: '', item_name: '', description: '', qty: '', rate: '' }]);
  const dispatch = useDispatch();

  const handleDetailChange = (index, key, value) => {
    const updatedData = [...detailData];
    updatedData[index][key] = value;
    setDetailData(updatedData);
  };

  const handleAddRow = () => {
    setDetailData([...detailData, { item_code: '', item_name: '', description: '', qty: '', rate: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedData = [...detailData];
    updatedData.splice(index, 1);
    setDetailData(updatedData);
  };

  const handleDetailSubmit = async () => {
    // Validate detail data
    if (validateDetailData(detailData)) {
      try {
        // Make API call to insert data
        const response = await axios.post('http://5.189.180.8:8010/detail', { detail_table: detailData });
        
        // Dispatch an action with the response if needed
        dispatch({ type: 'DETAIL_SUBMITTED', payload: response.data });
      } catch (error) {
        // Handle API call error
        console.log('Error submitting detail data:', error);
        // Display error message or take appropriate action
      }
    } else {
      setError(true)
    }
  };

  return (
    <Container>
      <h2 className='text-center'>Details</h2>{ error?
      <div className='text-danger'>All fields are required & Enter data in correct format  </div>:""
}
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
                <td><Form.Control type="text" value={row.item_code} onChange={(e) => handleDetailChange(index, 'item_code', e.target.value)} /></td>
                <td><Form.Control type="text" value={row.item_name} onChange={(e) => handleDetailChange(index, 'item_name', e.target.value)} /></td>
                <td><Form.Control type="text" value={row.description} onChange={(e) => handleDetailChange(index, 'description', e.target.value)} /></td>
                <td><Form.Control type="number" value={row.qty} onChange={(e) => handleDetailChange(index, 'qty', e.target.value)} /></td>
                <td><Form.Control type="number" value={row.rate} onChange={(e) => handleDetailChange(index, 'rate', e.target.value)} /></td>
                <td><Button variant="danger" onClick={() => handleRemoveRow(index)}>Remove</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" className='me-2 mt-2' onClick={handleAddRow}>Add Row</Button>
        <Button variant="primary" className='me-2 mt-2' onClick={handleDetailSubmit}>Submit</Button>
      </Form>
    </Container>
  );
};

export default Details;

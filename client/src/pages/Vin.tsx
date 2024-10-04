
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';
  
  function VIN() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="VIN input">
          <Form.Label>VIN</Form.Label>
          <Form.Control type="VIN" placeholder="Enter the VIN" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
  
  export default VIN;
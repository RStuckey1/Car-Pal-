
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';
  
  function Vin() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="VinInput">
          <Form.Label>VIN</Form.Label>
          <Form.Control type="Vin" placeholder="Enter the VIN" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
  
  export default Vin;
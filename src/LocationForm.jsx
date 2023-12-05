/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';



export default function LocationForm({handleChangeCity, updateQuery}) {

  
  function handleSubmit(event) {
    event.preventDefault();
    handleChangeCity()
    console.log(event.target.value)
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Where would you like to explore?</Form.Label>
        <Form.Control 
        type="location" 
        placeholder="Enter Here"
        onChange={updateQuery} 
        />
        <Form.Text className="text-muted">
        </Form.Text>
        <Button  
        variant="primary" 
        type="submit" 
        onClick={handleChangeCity}>
          {/* /* figure out where this onClick goes(here or App) */ }
          Explore!
        </Button>
        </Form.Group>
    </Form>
  );
}



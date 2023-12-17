/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';



export default function LocationForm({handleChangeCity, updateQuery, searchQuery, }) {

  
  function handleSubmit(event) {
    event.preventDefault();
    const inputValue = searchQuery;
    const cityValue = event.target.value;
    console.log(cityValue);
    // undefined
    handleChangeCity(cityValue);
    console.log(inputValue, 'input value');
    // undefined
    
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
          Explore!
        </Button>
        </Form.Group>
    </Form>
  );
}



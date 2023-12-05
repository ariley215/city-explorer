import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import LocationForm from './LocationForm';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [location, setLocation] = useState( "");
  const [searchQuery, setSearchQuery] = useState('');

  function updateQuery(event) {
    console.log(event)
    setSearchQuery(event.target.value);
  }

console.log(API_KEY)
  async function getLocation() {
    // alert('getting')

    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    console.log('Before Axios Request', API);
    try {
      const response = await axios.get(API);
      console.log('API Response:', response.data);
      setLocation(response.data[0].display_name );
    }
   catch (error){
   
   
    console.error('API Request Error:', error);
   }
  }
// function changeCity(newCity) {
//   getLocation(newCity)
// }


console.log(location)
return (
  <Container>
    <LocationForm
      handleChangeCity={getLocation}
      updateQuery={updateQuery}
   />
    <h2>The city is {location}</h2>
  </Container>
);

}


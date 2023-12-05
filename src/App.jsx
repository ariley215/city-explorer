import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import LocationForm from './LocationForm';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
const [location, setLocation] = useState({display_name: ""});
const [searchQuery, setSearchQuery] = useState('');

function updateQuery(event) {
  setSearchQuery(event.target.value);
}

 async function getLocation() {
  alert('getting')
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    const response = await axios.get(API);
    setLocation({display_name: searchQuery});

}

    
  }

  return (
    <Container>
      <LocationForm 
      onClick={getLocation} 
      onChange={updateQuery}
      show={""} 
      searchQuery={searchQuery} />
      <h2>The city is {location.display_name}</h2>
    </Container>
  );
}



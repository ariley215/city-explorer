/* eslint-disable no-empty */
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import LocationForm from './LocationForm';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [location, setLocation] = useState({ display_name: '', lat: '', lon: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [mapImage, setMapImage] = useState(null);

  function updateQuery(event) {
    console.log(event.target.value)
    setSearchQuery(event.target.value);
  
  
  }

  async function getLocation() {
    

    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    console.log('Before Axios Request', API);
    try {
      const response = await axios.get(API);
      console.log('API Response:', response.data);
      const { display_name, lat, lon } = response.data[0];


      setLocation({ city: display_name, lat, lon });
      exploreMap(lat, lon);

    }
    catch (error) {
      console.error('API Request Error:', error);
    }
  }

  const exploreMap = async (cityLat, cityLon) => {
    console.log(cityLat, cityLon);
    try {
      if (!cityLat|| !cityLon) {
        console.warn('Location data is not available. Aborting exploreMap.');
        return;
      }
      const locationString = `${cityLat},${cityLon}`;
      // value not being held
     console.log(locationString);
      const apiUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${cityLat},${cityLon}&zoom=12`;

      console.log(apiUrl);
     
        setMapImage(apiUrl);

    } catch (error) {
      console.error('API Request Error:', error);
    }
  };



  return (
    <Container>
      <LocationForm
        handleChangeCity={getLocation}
        updateQuery={updateQuery}
      />
      <h2>The city is {location.city}</h2>
      <p>Located at Latitute: {location.lat}, Longitude {location.lon}</p>
      <div>
        {mapImage && <img src={mapImage} alt="Map" />}
      </div>
    </Container>
  );

}


/* eslint-disable no-empty */
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import LocationForm from './LocationForm';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [location, setLocation] = useState({ city: '', lat: '', lon: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [mapImage, setMapImage] = useState(null);

  function updateQuery(event) {
    setSearchQuery(event.target.value);
    console.log(event.target.value)
  }

  async function getLocation() {
    

    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    console.log('Before Axios Request', API);
    try {
      const response = await axios.get(API);
      console.log('API Response:', response.data);
      const { display_name, lat, lon } = response.data[0];


      setLocation({ city: display_name, lat, lon });

    }
    catch (error) {
      console.error('API Request Error:', error);
    }
  }

  const exploreMap = async () => {
    try {
      if (!location.lat || !location.lon) {
        console.warn('Location data is not available. Aborting exploreMap.');
        return;
      }
      const locationString = `${location.lat}, ${location.lon}`;
      // value not being held
     
      const apiUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${encodeURIComponent(locationString)}&zoom=12`;

      console.log(apiUrl);
      const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
      if (response.status === 200) {

        const dataUrl = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;

        setMapImage(dataUrl);
      } else {
        alert('failed to fetch map');
      }
    } catch (error) {
      console.error('API Request Error:', error);
    }
  };



  return (
    <Container>
      <LocationForm
        handleChangeCity={getLocation}
        updateQuery={updateQuery}
        exploreMap={exploreMap}
      />
      <h2>The city is {location.city}</h2>
      <p>Located at Latitute: {location.lat}, Longitude {location.lon}</p>
      <div>
        {mapImage && <img src={mapImage} alt="Map" />}
      </div>
    </Container>
  );

}


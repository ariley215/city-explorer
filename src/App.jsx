/* eslint-disable no-empty */
// add env file import
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Weather from './Weather';
import LocationForm from './LocationForm';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [location, setLocation] = useState({ display_name: '', lat: '', lon: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [mapImage, setMapImage] = useState(null);
  const [error, setError] = useState(null);
  const [cityWeather, setCityWeather] = useState(null);

  function updateQuery(event) {
    console.log(event.target.value)
    setSearchQuery(event.target.value);



  }

  async function getLocation() {


    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    console.log('Before Axios Request', API);
    try {
      setError(null);
      const response = await axios.get(API);
      console.log('API Response:', response.data);
      const { display_name, lat, lon } = response.data[0];


      setLocation({ city: display_name, lat, lon });
      exploreMap(lat, lon);
      getWeatherFromCitySearch(lat, lon);
    }
    catch (error) {
      console.error('API Request Error:', error);
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          setError(`Bad Request: ${data.error || 'Invalid input data'}`);
        } else if (status === 404) {
          setError(`Not Found: ${data.error || 'Resource not found'}`);
        } else if (status === 500) {
          setError(`Internal Server Error: ${data.error || 'Server error'}`);
        } else {
          setError(`Error: ${status}`);
        }
      } else {
        setError('Network Error: Unable to connect to the server');
      }
    }
  }

  const exploreMap = async (cityLat, cityLon) => {
    console.log(cityLat, cityLon);
    try {
      if (!cityLat || !cityLon) {
        console.warn('Location data is not available. Aborting exploreMap.');
        return;
      }

      const apiUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${cityLat},${cityLon}&zoom=12`;

      console.log(apiUrl);
      const response = await axios.get(apiUrl);
      if (response.data && response.data.error) {
        console.log('Explore Map Error', response.data.error);
        setError(`Map Error: $response.data.error`);
      } else {
        setMapImage(apiUrl);
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setError('Unable to load map. Please try again.')
    }

  };

  async function getWeatherFromCitySearch(lat, lon) {
    const localApi = 'http://localhost:3005';
    console.log('local API', localApi);
    const response = await axios.get(`${localApi}/weather?lon=${lat}&lat=${lon}&searchQuery=${searchQuery}`);
    console.log(response, 'city weather response');
    setCityWeather(response);




  }



  return (
    <Container>
      <LocationForm
        handleChangeCity={getLocation}
        updateQuery={updateQuery}
      />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h2>The city is {location.city}</h2>
      <p>Located at Latitute: {location.lat}, Longitude {location.lon}</p>
      <div>
        {mapImage && <img src={mapImage} alt="Map" />}
      </div>
      {/* <p>Date: {JSON.stringify( */}
      {cityWeather ?
        cityWeather.data.weatherData.map((weather, idx) => (
          // <div key={idx}>
          //   <p>{weather.date}</p>
          //   <p>{weather.description}</p>
          // </div>
          <Weather weather={weather}
            key={idx} />
        )) : <p></p>
      }
      {/* )}</p> */}
      {/* <Weather cityWeather={cityWeather} /> */}
    </Container >
  );

}
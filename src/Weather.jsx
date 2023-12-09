
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function displayWeather(weather, key) {
  console.log(weather);
  return (
    // <Container>
    //   <Row>
    //     <Col sm={8}></Col>
    //     <Col sm={4}></Col>
    //   </Row>
    //   <Row>
    //     <Col sm={true}></Col>
    //     <Col sm={true}></Col>
    //     <Col sm={true}></Col>
    //   </Row>
    // </Container>
    // <div>
    //     {  cityWeather?
    //     cityWeather.data.weatherData.map((weather, idx) => (
        <div key={key}>
          <p>{weather.weather.date}</p>
          <p>{weather.weather.description}</p>
        </div>
    //   )) : <p></p>
    //     }
    // </div>
  );
}


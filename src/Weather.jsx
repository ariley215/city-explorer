
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default function displayWeather(weather, key) {
  console.log(weather);
  return (
        <Container>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Daily Weather</Card.Title>
              <Card.Text key={key}>
                  {weather.weather.date}
                  {weather.weather.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      );
    }





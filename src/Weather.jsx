
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default function displayWeather(weather, key) {
  console.log(weather);
  return (
        <Container>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Daily Weather</Card.Title>
              <Card.Text>
                <div key={key}>
                  <p>{weather.weather.date}</p>
                  <p>{weather.weather.description}</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      );
    }





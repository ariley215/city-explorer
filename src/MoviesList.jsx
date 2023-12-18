/* eslint-disable react/prop-types */
import { Card, Container, Row, Col } from 'react-bootstrap';

const MoviesList = ({ movies, key }) => {
  console.log('Movies in MoviesList component:', movies);
  return (
    <Container>
      <Row>
        <Col key={key}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movies.image} alt={movies.title} />
            <Card.Body>
              <Card.Title>{movies.title}</Card.Title>
              <Card.Text>{movies.overview}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesList;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Modal } from 'react-bootstrap';

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Fetch the photo details based on the ID (you can adapt this to your API)
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => response.json())
      .then((data) => setPhoto(data))
      .catch((error) => {
        console.error('Error fetching photo details:', error);
      });
  }, [id]);

  return (
    <Container>
      <h1>Photo Details</h1>
      {photo && (
        <Row>
          <Col xs={12} md={6}>
            <img src={photo.url} alt={photo.title} className="img-fluid" />
          </Col>
          <Col xs={12} md={6}>
            <h2>Title: {photo.title}</h2>
            <p><strong>Album ID:</strong> {photo.albumId}</p>
            <p><strong>Photo ID:</strong> {photo.id}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PhotoDetails;

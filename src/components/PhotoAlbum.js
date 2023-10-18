// src/components/PhotoAlbum.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';

const PhotoAlbum = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  const closeAndClearModal = () => {
    setSelectedPhoto(null);
    setShowModal(false);
  };

  const filterPhotos = () => {
    return photos.filter((photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <Container>
      <h1>Photo Album</h1>
      <input
        type="text"
        placeholder="Search photos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Row>
        {filterPhotos().map((photo) => (
          <Col key={photo.id} xs={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={photo.thumbnailUrl}
                alt={photo.title}
                onClick={() => openModal(photo)}
                style={{ cursor: 'pointer' }}
              />
              <Card.Body>
                <Card.Title>
                  {photo.title.length > 20
                    ? `${photo.title.slice(0, 20)}...`
                    : photo.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <PhotoModal
        show={showModal}
        onHide={closeAndClearModal}
        photo={selectedPhoto}
      />
    </Container>
  );
};

const PhotoModal = ({ show, onHide, photo }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Photo Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {photo && (
          <div>
            <img
              src={photo.url}
              alt={photo.title}
              className="img-fluid"
            />
            <p>
              <strong>Title:</strong> {photo.title}
            </p>
            <p>
              <strong>Album ID:</strong> {photo.albumId}
            </p>
            <p>
              <strong>Photo ID:</strong> {photo.id}
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PhotoAlbum;

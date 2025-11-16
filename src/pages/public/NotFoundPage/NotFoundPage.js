import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <div className="container">
        <Card>
          <Card.Body>
            <h1>Page not found</h1>
            <p className="text-muted">The page you are looking for doesn’t exist or has moved.</p>
            <div className="not-found__actions">
              <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
              <Button variant="outline" onClick={() => navigate('/search')}>Browse Cars</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundPage;

import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import anonymousPng from '../assets/anonymous.png';

const heroBg = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80';

function Home({ isAuthenticated, user }) {
  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.6)), url(${heroBg}) center/cover no-repeat`,
          color: 'white',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          marginBottom: '2rem',
          position: 'relative',
        }}
      >
        <Image
          src={anonymousPng}
          alt="Anonymous"
          style={{
            position: 'absolute',
            left: 30,
            top: 30,
            width: 80,
            height: 80,
            opacity: 0.25,
            zIndex: 1,
          }}
        />
        <h1 className="display-3 fw-bold mb-3" style={{ zIndex: 2, position: 'relative' }}>Welcome to Confession Wall</h1>
        <p className="lead mb-4" style={{ maxWidth: 600, margin: '0 auto', zIndex: 2, position: 'relative' }}>
          A safe space to share your thoughts and confessions anonymously
        </p>
        {isAuthenticated ? (
          <div className="d-flex justify-content-center gap-3 mb-4" style={{ zIndex: 2, position: 'relative' }}>
            <Button as={Link} to="/confessions" variant="light" size="lg" className="fw-bold">
              View Confessions
            </Button>
            <Button as={Link} to="/create-confession" variant="outline-light" size="lg" className="fw-bold">
              Create Confession
            </Button>
          </div>
        ) : (
          <div className="d-flex justify-content-center gap-3 mb-4" style={{ zIndex: 2, position: 'relative' }}>
            <Button as={Link} to="/register" variant="light" size="lg" className="fw-bold">
              Register Now
            </Button>
            <Button as={Link} to="/login" variant="outline-light" size="lg" className="fw-bold">
              Login
            </Button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 glass-card">
              <Card.Body className="text-center p-4">
                <Card.Title className="mb-3 fs-4">Share Anonymously</Card.Title>
                <Card.Text>
                  Express yourself freely without revealing your identity. Your privacy is our priority.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 glass-card">
              <Card.Body className="text-center p-4">
                <Card.Title className="mb-3 fs-4">Connect with Others</Card.Title>
                <Card.Text>
                  Read and interact with confessions from others who might be going through similar experiences.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 glass-card">
              <Card.Body className="text-center p-4">
                <Card.Title className="mb-3 fs-4">Safe Environment</Card.Title>
                <Card.Text>
                  Our platform ensures a respectful and supportive environment for everyone.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home; 
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  const teamMembers = [
    {
      name: "Md Anas",
      role: "Lead Developer",
      image: "/team/anas.jpg",
      description: "Full-stack developer with expertise in React and Node.js"
    },
    {
      name: "Irteza Khan",
      role: "Frontend Developer",
      image: "/team/irteza.jpg",
      description: "Expert in React, HTML, CSS, JavaScript and modern UI/UX design"
    },
    {
      name: "Mauli Navale",
      role: "Frontend & UI Developer",
      image: "/team/mauli.jpg",
      description: "Expert in React and modern UI/UX design"
    }
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">About Us</h1>
      
      <div className="glass-section mb-5">
        <h2 className="mb-4">Our Mission</h2>
        <p className="lead">
          We created this Confession App to provide a safe and anonymous platform for people to share their thoughts, 
          experiences, and feelings. Our goal is to foster a supportive community where everyone can express themselves 
          freely without fear of judgment.
        </p>
      </div>

      <h2 className="text-center mb-4">Our Team</h2>
      <Row className="g-4">
        {teamMembers.map((member, index) => (
          <Col key={index} md={4}>
            <Card className="h-100 glass-card">
              <div className="image-container">
                <Card.Img 
                  variant="top" 
                  src={member.image} 
                  alt={member.name}
                  className="rounded-image"
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                <Card.Text>{member.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="features-section mt-5">
        <h2 className="mb-4">What We Offer</h2>
        <Row className="g-4">
          <Col md={4}>
            <div className="feature-card">
              <h3>Anonymous Sharing</h3>
              <p>Share your thoughts and experiences without revealing your identity.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-card">
              <h3>Community Support</h3>
              <p>Connect with others through reactions and comments.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-card">
              <h3>Safe Environment</h3>
              <p>Our platform is moderated to ensure a positive experience for everyone.</p>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default About; 
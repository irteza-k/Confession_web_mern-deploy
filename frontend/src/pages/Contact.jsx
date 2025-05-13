import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Container className="my-5 d-flex justify-content-center align-items-center min-vh-100">
      <Card className="glass-card" style={{ maxWidth: '600px', width: '100%' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Contact Us</h2>
          <p className="text-center mb-4">
            Have feedback, questions, or want to report an issue? Fill out the form below or email us at{' '}
            <a href="mailto:support@confessionapp.com">support@confessionapp.com</a>.
          </p>
          
          {submitted && (
            <Alert variant="success" className="text-center">
              Thank you for your message! We'll get back to you soon.
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                required 
                className="form-control-lg"
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                className="form-control-lg"
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                name="message" 
                value={form.message} 
                onChange={handleChange} 
                rows={4} 
                required 
                className="form-control-lg"
              />
            </Form.Group>
            
            <div className="text-center">
              <Button 
                type="submit" 
                variant="primary" 
                className="fw-bold px-5 py-2"
                style={{ minWidth: '150px' }}
              >
                Send
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Contact; 
import { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateConfession() {
  const [formData, setFormData] = useState({
    confessionText: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/confessions',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate('/confessions');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create confession');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="glass-card" style={{ maxWidth: '800px', width: '100%' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Create New Confession</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Confession</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="confessionText"
                value={formData.confessionText}
                onChange={handleChange}
                required
                placeholder="Share your confession..."
                className="form-control-lg"
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => navigate('/confessions')}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="px-4"
              >
                {loading ? 'Creating...' : 'Create Confession'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateConfession; 
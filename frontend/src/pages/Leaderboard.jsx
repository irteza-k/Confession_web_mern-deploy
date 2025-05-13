import { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';

function Leaderboard() {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/confessions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfessions(Array.isArray(response.data.confessions) ? response.data.confessions : response.data.confessions);
    } catch (err) {
      setError('Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Card className="glass-card p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Leaderboard</h2>
          <p className="text-center mb-4 text-muted">Top confessions by reactions and comments</p>
          {error && <Alert variant="danger">{error}</Alert>}
          {confessions.length === 0 ? (
            <Alert variant="info">No confessions yet.</Alert>
          ) : (
            <div>
              {confessions.slice(0, 10).map((confession, idx) => (
                <Card key={confession._id} className="mb-3 glass-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">#{idx + 1}</span>
                      {idx === 0 && <Badge bg="warning" text="dark">🔥 Trending</Badge>}
                    </div>
                    <Card.Text className="mb-2">{confession.confessionText}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Posted by {confession.postedBy || 'Anonymous'}
                      </small>
                      <small className="text-muted">
                        Popularity: {confession.popularity || 0}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Leaderboard; 
import { useState, useEffect } from 'react';
import { Card, Button, Spinner, Alert, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import anonymousPng from '../assets/anonymous.png';
import './Confessions.css';

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '👏'];
const bgImg = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80';

function Confessions() {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  const [reactionLoading, setReactionLoading] = useState({});

  useEffect(() => {
    fetchConfessions();
  }, []);

  const fetchConfessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/confessions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfessions(Array.isArray(response.data.confessions) ? response.data.confessions : response.data.confessions);
    } catch (err) {
      setError('Failed to fetch confessions');
    } finally {
      setLoading(false);
    }
  };

  const handleReact = async (confessionId, emoji) => {
    setReactionLoading((prev) => ({ ...prev, [confessionId]: true }));
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/confessions/${confessionId}/react`,
        { emoji },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchConfessions();
    } catch (err) {
      setError('Failed to react');
    } finally {
      setReactionLoading((prev) => ({ ...prev, [confessionId]: false }));
    }
  };

  const handleCommentChange = (confessionId, value) => {
    setCommentInputs((prev) => ({ ...prev, [confessionId]: value }));
  };

  const handleCommentSubmit = async (confessionId) => {
    const text = commentInputs[confessionId];
    if (!text || text.trim() === '') return;
    setCommentLoading((prev) => ({ ...prev, [confessionId]: true }));
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/confessions/${confessionId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentInputs((prev) => ({ ...prev, [confessionId]: '' }));
      fetchConfessions();
    } catch (err) {
      setError('Failed to comment');
    } finally {
      setCommentLoading((prev) => ({ ...prev, [confessionId]: false }));
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
    <div className="confessions-container">
      <div className="container">
        <div className="confessions-header">
          <h2>Confessions</h2>
          <Button as={Link} to="/create-confession" className="create-confession-btn">
            Create New Confession
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {Array.isArray(confessions) && confessions.length === 0 ? (
          <Alert variant="info">No confessions found. Be the first to share!</Alert>
        ) : (
          Array.isArray(confessions) && (
            <div className="row">
              {confessions.map((confession) => (
                <div key={confession._id} className="col-md-6 mb-4">
                  <Card className="glass-card h-100">
                    <Image
                      src={anonymousPng}
                      alt="Anonymous"
                      className="anonymous-icon"
                    />
                    <Card.Body className="confession-content p-4">
                      <Card.Title className="fs-5 mb-2">{confession.confessionText}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                        <small className="text-muted">
                          Posted by {confession.postedBy || 'Anonymous'}
                        </small>
                        <small className="text-muted">
                          {confession.datePosted ? new Date(confession.datePosted).toLocaleDateString() : ''}
                        </small>
                      </div>
                      <div className="mb-2">
                        {EMOJIS.map((emoji) => (
                          <Button
                            key={emoji}
                            variant="outline-primary"
                            size="sm"
                            className="reaction-button"
                            disabled={reactionLoading[confession._id]}
                            onClick={() => handleReact(confession._id, emoji)}
                          >
                            {emoji} {confession.reactions && confession.reactions[emoji] ? confession.reactions[emoji] : 0}
                          </Button>
                        ))}
                      </div>
                      <div className="mt-3">
                        <h6 className="fw-bold">Comments</h6>
                        {confession.comments && confession.comments.length > 0 ? (
                          <div className="comments-section">
                            {confession.comments.map((comment, idx) => (
                              <div key={idx} className="comment-item">
                                <span>{comment.text}</span>
                                <span className="text-muted float-end" style={{ fontSize: '0.8em' }}>
                                  {comment.date ? new Date(comment.date).toLocaleDateString() : ''}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mb-2 text-muted">No comments yet.</div>
                        )}
                        <Form
                          className="comment-form"
                          onSubmit={e => {
                            e.preventDefault();
                            handleCommentSubmit(confession._id);
                          }}
                        >
                          <Form.Control
                            type="text"
                            placeholder="Add a comment..."
                            value={commentInputs[confession._id] || ''}
                            onChange={e => handleCommentChange(confession._id, e.target.value)}
                            disabled={commentLoading[confession._id]}
                            className="comment-input"
                          />
                          <Button
                            type="submit"
                            className="comment-submit"
                            disabled={commentLoading[confession._id]}
                          >
                            {commentLoading[confession._id] ? 'Posting...' : 'Post'}
                          </Button>
                        </Form>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Confessions; 
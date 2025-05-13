import { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function Admin({ isAuthenticated, user }) {
  const [users, setUsers] = useState([]);
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notAuthorized, setNotAuthorized] = useState(false);

  useEffect(() => {
    console.log('Admin component mounted. User:', user);
    console.log('Is authenticated:', isAuthenticated);
    fetchAdminData();
    // eslint-disable-next-line
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');
      
      // Fetch users
      const usersRes = await axios.get('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Users data:', usersRes.data);
      setUsers(usersRes.data);

      // Fetch confessions
      const confessionsRes = await axios.get('http://localhost:5000/api/confessions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfessions(Array.isArray(confessionsRes.data.confessions) ? confessionsRes.data.confessions : confessionsRes.data.confessions);
      setLoading(false);
    } catch (err) {
      console.error('Admin data fetch error:', err);
      if (err.response && err.response.status === 403) {
        setNotAuthorized(true);
      } else {
        setError('Failed to fetch admin data');
      }
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in again.');
      return;
    }

    try {
      console.log('Attempting to delete user:', id);
      console.log('Current user:', user);
      console.log('Token:', token);
      
      const response = await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Delete response:', response.data);
      setUsers(users.filter(u => u._id !== id));
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Delete user error:', err);
      console.error('Error response:', err.response?.data);
      
      if (err.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else if (err.response?.status === 403) {
        setError('You do not have permission to delete users.');
      } else if (err.response?.status === 404) {
        setError('User not found.');
      } else {
        setError(err.response?.data?.message || 'Failed to delete user. Please try again.');
      }
    }
  };

  const handleDeleteConfession = async (id) => {
    if (!window.confirm('Are you sure you want to delete this confession?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/confessions/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfessions(confessions.filter(c => c._id !== id));
    } catch (err) {
      console.error('Delete confession error:', err);
      setError(err.response?.data?.message || 'Failed to delete confession');
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (notAuthorized) {
    return <Container className="my-5"><Alert variant="danger">Not authorized. Admins only.</Alert></Container>;
  }

  return (
    <Container className="my-5">
      <Card className="glass-card p-4 mb-4">
        <Card.Body>
          <h2 className="text-center mb-4">Admin Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <h4 className="mb-3">Users</h4>
          <Table striped bordered hover responsive className="bg-transparent">
            <thead>
              <tr>
                <th>Username</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.isAdmin ? 'Yes' : 'No'}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteUser(u._id)} disabled={u.isAdmin}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="mb-3 mt-5">Confessions</h4>
          <Table striped bordered hover responsive className="bg-transparent">
            <thead>
              <tr>
                <th>Text</th>
                <th>Posted By</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {confessions.map(c => (
                <tr key={c._id}>
                  <td>{c.confessionText}</td>
                  <td>{c.postedBy}</td>
                  <td>{c.datePosted ? new Date(c.datePosted).toLocaleDateString() : ''}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteConfession(c._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Admin; 
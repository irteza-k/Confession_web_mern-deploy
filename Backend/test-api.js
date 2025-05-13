const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let token = '';
let userId = '';

async function testEndpoints() {
  try {
    // 1. Register User
    console.log('\n1. Testing Register User...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {
      username: 'testuser1',
      password: 'password123'
    });
    console.log('Register Response:', registerResponse.data);
    token = registerResponse.data.token;
    userId = registerResponse.data.user.id;

    // 2. Login User
    console.log('\n2. Testing Login User...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      username: 'testuser1',
      password: 'password123'
    });
    console.log('Login Response:', loginResponse.data);

    // 3. Get User Profile
    console.log('\n3. Testing Get User Profile...');
    const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Profile Response:', profileResponse.data);

    // 4. Create Confession
    console.log('\n4. Testing Create Confession...');
    const confessionResponse = await axios.post(
      `${API_URL}/confessions`,
      {
        confessionText: 'This is a test confession',
        postedBy: 'testuser1'
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('Create Confession Response:', confessionResponse.data);
    const confessionId = confessionResponse.data._id;

    // 5. Get All Confessions
    console.log('\n5. Testing Get All Confessions...');
    const allConfessionsResponse = await axios.get(`${API_URL}/confessions`);
    console.log('All Confessions Response:', allConfessionsResponse.data);

    // 6. Get Single Confession
    console.log('\n6. Testing Get Single Confession...');
    const singleConfessionResponse = await axios.get(`${API_URL}/confessions/${confessionId}`);
    console.log('Single Confession Response:', singleConfessionResponse.data);

    // 7. Update Confession
    console.log('\n7. Testing Update Confession...');
    const updateConfessionResponse = await axios.put(
      `${API_URL}/confessions/${confessionId}`,
      {
        confessionText: 'This is an updated test confession',
        postedBy: 'testuser1'
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('Update Confession Response:', updateConfessionResponse.data);

    // 8. Get User's Confessions
    console.log('\n8. Testing Get User\'s Confessions...');
    const userConfessionsResponse = await axios.get(`${API_URL}/confessions/user/confessions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('User\'s Confessions Response:', userConfessionsResponse.data);

    // 9. Delete Confession
    console.log('\n9. Testing Delete Confession...');
    const deleteConfessionResponse = await axios.delete(`${API_URL}/confessions/${confessionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Delete Confession Response:', deleteConfessionResponse.data);

  } catch (error) {
    console.error('Error:', error);
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
    if (error.stack) {
      console.error('Error Stack:', error.stack);
    }
  }
}

testEndpoints(); 
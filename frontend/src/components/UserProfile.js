import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in.');
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token); 
      const userId = decodedToken.userId;

      axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load user data');
          setLoading(false);
        });
    } catch (err) {
      setError('Invalid token');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome, {user ? user.name : 'User'}</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Joined: {user.createdAt}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/signup', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className='col-6 offset-3'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label for="username" class="form-label">User Name</label>
          <input type="text" class="form-control" value={name} id="username" placeholder='userName' onChange={(e) => setName(e.target.value)} required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" value={email} id="email" placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} id="password" required />
        </div>
        <button type="submit" class="btn btn-primary">SignUp</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
      Already have an account?<Link to="/login">LogIn</Link>
      </p>
    </div>
  );
}



export default Signup;

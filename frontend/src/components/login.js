import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token);

            setUser({ email });

            navigate('/portfolio');
        } catch (err) {
            setError('Invalid credentials. Please check your email and password.');
        }
    };

    return (
        <div className='col-6 offset-3'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" value={email} id="email" placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} id="password"/>
                </div>
                <button type="submit" class="btn btn-primary">LogIn</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
}

export default Login;

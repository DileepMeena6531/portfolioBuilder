import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Signup from './components/Signup';
import Login from './components/login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });  
    }
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem('token');  
    setUser(null); 
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/portfolio" element={user ? <Portfolio /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Signup from './components/Signup';
import Login from './components/login';
import CreatePortfolio from './components/create';
import UserProfile from './components/UserProfile';
import "./App.css"

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
        <UserProfile/>
        <nav>
          <ul>
            {!user ? (
              <>
              
                  <Link type="button" className="mt-2 btn btn-outline-success" to="/login">Login</Link>
                  <Link type="button" className="ms-2 mt-2 btn btn-outline-success" to="/signup">Signup</Link>
             
              </>
            ) : (
              
                <button type="button" className="mt-2 btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/portfolio" element={user ? <Portfolio /> : <Login />} />
          <Route path="/create" element={user ? <CreatePortfolio /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

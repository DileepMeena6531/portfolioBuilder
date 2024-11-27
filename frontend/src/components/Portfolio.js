import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './portfolio.css';

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {

      navigate('/login');
    } else {
      const fetchPortfolio = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/portfolios', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Fetched portfolio data:", response.data);
          setPortfolio(response.data); 
        } catch (err) {
          console.error('Error fetching portfolio:', err);
        }
      };

      fetchPortfolio();
    }
  }, [navigate]);

  if (!portfolio.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className='portfolio-container'>
      <h1>Portfolio</h1>
      <ul>
        {portfolio.map((item) => (
          <li key={item._id}>
            <h2>{item.title}</h2>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Template:</strong> {item.template}</p>
            
            <div>
              <h3>Skills</h3>
              {item.skills && item.skills.length > 0 ? (
                <ul>
                  {item.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p>No skills available.</p>
              )}
            </div>

            <div>
              <h3>Projects</h3>
              {item.projects && item.projects.length > 0 ? (
                <ul>
                  {item.projects.map((project) => (
                    <li key={project._id}>
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub Link</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No projects available.</p>
              )}
            </div>

            <div>
              <h3>Certifications</h3>
              {item.certifications && item.certifications.length > 0 ? (
                <ul>
                  {item.certifications.map((cert) => (
                    <li key={cert._id}>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">{cert.name}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No certifications available.</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;

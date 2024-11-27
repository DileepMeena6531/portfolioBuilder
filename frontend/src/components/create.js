import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import "./create.css"

function CreatePortfolio() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    template: '',
    projects: [
      {
        title: '',
        description: '',
        githubLink: '',
        media: '',
        skills: '',
      },
    ],
    skills: '',
    certifications: [
      {
        name: '',
        link: '',
      },
    ],
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (err) {
      console.error('Error decoding token:', err);
      navigate('/login');
    }
  } else {
    navigate('/login');
  }

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedProjects = [...formData.projects];
      updatedProjects[index][field] = value;
      setFormData({ ...formData, projects: updatedProjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProjectArrayChange = (e, index, field) => {
    const { value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value.split(',').map((item) => item.trim());
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleCertificationChange = (e, index, field) => {
    const { value } = e.target;
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index][field] = value;
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: '',
          description: '',
          githubLink: '',
          media: '',
          skills: '',
        },
      ],
    });
  };

  const handleAddCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        { name: '', link: '' },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage('Unable to find user information. Please log in again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/portfolios',
        { userId, ...formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message);
      navigate('/portfolio');
    } catch (err) {
      console.error('Error creating portfolio:', err.response?.data || err.message);
      setMessage('Failed to create portfolio. Please try again.');
    }
  };

  return (
    <div className="create-portfolio-container">
      <h1>Create Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Template:</label>
          <input
            type="text"
            name="template"
            value={formData.template}
            onChange={handleChange}
            required
          />
        </div>

        {formData.projects.map((project, index) => (
          <div key={index}>
            <h3>Project {index + 1}</h3>
            <div>
              <label>Project Title:</label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleChange(e, index, 'title')}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={project.description}
                onChange={(e) => handleChange(e, index, 'description')}
                required
              />
            </div>
            <div>
              <label>GitHub Link:</label>
              <input
                type="url"
                name="githubLink"
                value={project.githubLink}
                onChange={(e) => handleChange(e, index, 'githubLink')}
                required
              />
            </div>
            <div>
              <label>Media (comma-separated URLs):</label>
              <input
                type="text"
                name="media"
                value={project.media}
                onChange={(e) => handleProjectArrayChange(e, index, 'media')}
                required
              />
            </div>
            <div>
              <label>Skills (comma-separated):</label>
              <input
                type="text"
                name="skills"
                value={project.skills}
                onChange={(e) => handleProjectArrayChange(e, index, 'skills')}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddProject}>
          Add Another Project
        </button>

        <div>
          <label>Skills (comma-separated):</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>

        {formData.certifications.map((certification, index) => (
          <div key={index}>
            <h3>Certification {index + 1}</h3>
            <div>
              <label>Certification Name:</label>
              <input
                type="text"
                name="name"
                value={certification.name}
                onChange={(e) => handleCertificationChange(e, index, 'name')}
                required
              />
            </div>
            <div>
              <label>Certification Link:</label>
              <input
                type="url"
                name="link"
                value={certification.link}
                onChange={(e) => handleCertificationChange(e, index, 'link')}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddCertification}>
          Add Another Certification
        </button>

        <button type="submit">Create Portfolio</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreatePortfolio;

const express = require('express');
const Portfolio = require('../models/Portfolio');
const router = express.Router();
const authenticateToken =require("../middleware/authenticateToken");

router.post('/', async (req, res) => {
  const { userId, title, description, template, projects, skills, certifications } = req.body;

  if (!userId || !title || !template) {
    return res.status(400).json({ message: 'Missing required fields: userId, title, or template' });
  }

  const processedSkills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());

  try {
    const newPortfolio = new Portfolio({
      userId,
      title,
      description,
      template,
      projects,
      skills:processedSkills,
      certifications
    });

    await newPortfolio.save();

    res.status(201).json({ message: 'Portfolio created', portfolio: newPortfolio });
  } catch (err) {
    console.error('Error creating portfolio:', err);  // More detailed error logging for debugging
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authenticateToken,async (req, res) => {
  try {
    const portfolios = await Portfolio.find(); 
    res.json(portfolios); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

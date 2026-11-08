const router = require('express').Router();
const Roadmap = require('../models/Roadmap');

// Get Roadmap by Career Match
router.get('/:careerMatch', async (req, res) => {
  try {
    const decodedMatch = decodeURIComponent(req.params.careerMatch);
    const roadmap = await Roadmap.findOne({ careerMatch: decodedMatch });
    
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found for this career match!' });
    }

    res.json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add a Roadmap (Admin / Seed purpose)
router.post('/add', async (req, res) => {
  try {
    const newRoadmap = new Roadmap(req.body);
    await newRoadmap.save();
    res.status(201).json({ success: true, message: 'Roadmap added successfully!', newRoadmap });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
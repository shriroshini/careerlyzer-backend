const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { getCareerRecommendations, getSkillGaps, careerData } = require('../utils/careerRecommendation');

const router = express.Router();

// Get career suggestions
router.get('/suggest', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.skills || user.skills.length === 0) {
      return res.status(400).json({ message: 'Please upload and analyze your resume first' });
    }

    const recommendations = getCareerRecommendations(user.skills);
    
    // Update user's career suggestions
    const topRecommendations = recommendations.slice(0, 5).map(career => ({
      careerName: career.careerName,
      matchPercentage: career.matchPercentage
    }));
    
    await User.findByIdAndUpdate(user._id, {
      careerSuggestions: topRecommendations
    });

    res.json({
      recommendations: recommendations.slice(0, 5),
      userSkills: user.skills
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get skill gaps for a specific career
router.get('/skill-gaps/:careerName', auth, async (req, res) => {
  try {
    const { careerName } = req.params;
    const user = await User.findById(req.user._id);
    
    const skillGaps = getSkillGaps(user.skills || [], careerName);
    const career = careerData.find(c => c.careerName === careerName);
    
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.json({
      careerName,
      userSkills: user.skills || [],
      requiredSkills: career.requiredSkills,
      missingSkills: skillGaps,
      skillGapPercentage: Math.round((skillGaps.length / career.requiredSkills.length) * 100)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get learning roadmap for a specific career
router.get('/roadmap/:careerName', auth, async (req, res) => {
  try {
    const { careerName } = req.params;
    const career = careerData.find(c => c.careerName === careerName);
    
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    const user = await User.findById(req.user._id);
    const skillGaps = getSkillGaps(user.skills || [], careerName);

    res.json({
      careerName: career.careerName,
      description: career.description,
      roadmap: career.roadmap,
      missingSkills: skillGaps,
      estimatedTimeToComplete: `${career.roadmap.length * 2}-${career.roadmap.length * 3} months`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all available careers
router.get('/all', async (req, res) => {
  try {
    const careers = careerData.map(career => ({
      careerName: career.careerName,
      description: career.description,
      requiredSkills: career.requiredSkills
    }));
    
    res.json({ careers });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
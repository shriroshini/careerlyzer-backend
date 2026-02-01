const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { extractSkills, calculateResumeScore, extractSections } = require('../utils/aiAnalysis');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and text files are allowed'));
    }
  }
});

// Upload and analyze resume
router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let resumeText = '';
    
    if (req.file.mimetype === 'application/pdf') {
      try {
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        resumeText = pdfData.text || '';
      } catch (pdfError) {
        // If PDF parsing fails, try to use the filename as text or return empty
        console.error('PDF parsing error:', pdfError.message);
        // Try to read as text anyway - some PDFs might have text content
        try {
          resumeText = fs.readFileSync(req.file.path, 'utf8');
        } catch (e) {
          resumeText = 'Unable to parse PDF content. Please try a different format.';
        }
      }
    } else {
      resumeText = fs.readFileSync(req.file.path, 'utf8');
    }

    // Extract skills and calculate score
    const skills = extractSkills(resumeText);
    const resumeScore = calculateResumeScore(resumeText, skills);
    const sections = extractSections(resumeText);

    // Update user data
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        resumeText,
        skills,
        resumeScore
      },
      { new: true }
    );

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'Resume analyzed successfully',
      resumeScore,
      skills,
      sections,
      analysis: {
        totalSkills: skills.length,
        wordCount: sections.wordCount,
        hasExperience: sections.hasExperience,
        hasEducation: sections.hasEducation,
        hasProjects: sections.hasProjects
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error analyzing resume' });
  }
});

// Get resume analysis
router.get('/analyze', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.resumeText) {
      return res.status(400).json({ message: 'No resume uploaded' });
    }

    const sections = extractSections(user.resumeText);

    res.json({
      resumeScore: user.resumeScore,
      skills: user.skills,
      sections,
      analysis: {
        totalSkills: user.skills.length,
        wordCount: sections.wordCount,
        hasExperience: sections.hasExperience,
        hasEducation: sections.hasEducation,
        hasProjects: sections.hasProjects
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
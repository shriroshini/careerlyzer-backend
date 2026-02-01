const natural = require('natural');

// Predefined skill keywords
const skillKeywords = [
  'javascript', 'python', 'java', 'react', 'node.js', 'mongodb', 'sql', 'html', 'css',
  'angular', 'vue', 'express', 'django', 'flask', 'spring', 'git', 'docker', 'kubernetes',
  'aws', 'azure', 'gcp', 'machine learning', 'data science', 'artificial intelligence',
  'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'mysql', 'postgresql',
  'redis', 'elasticsearch', 'graphql', 'rest api', 'microservices', 'devops', 'ci/cd',
  'jenkins', 'linux', 'bash', 'powershell', 'agile', 'scrum', 'project management'
];

// Extract skills from resume text
const extractSkills = (resumeText) => {
  const text = resumeText.toLowerCase();
  const foundSkills = [];
  
  skillKeywords.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });
  
  return [...new Set(foundSkills)]; // Remove duplicates
};

// Calculate resume score
const calculateResumeScore = (resumeText, skills) => {
  let score = 0;
  const text = resumeText.toLowerCase();
  
  // Skills score (40 points)
  const skillScore = Math.min(skills.length * 4, 40);
  score += skillScore;
  
  // Experience score (20 points)
  const experienceKeywords = ['experience', 'worked', 'developed', 'managed', 'led', 'created'];
  const experienceCount = experienceKeywords.filter(keyword => text.includes(keyword)).length;
  const experienceScore = Math.min(experienceCount * 3, 20);
  score += experienceScore;
  
  // Projects score (20 points)
  const projectKeywords = ['project', 'built', 'designed', 'implemented', 'deployed'];
  const projectCount = projectKeywords.filter(keyword => text.includes(keyword)).length;
  const projectScore = Math.min(projectCount * 4, 20);
  score += projectScore;
  
  // Education score (10 points)
  const educationKeywords = ['degree', 'university', 'college', 'bachelor', 'master', 'phd'];
  const educationCount = educationKeywords.filter(keyword => text.includes(keyword)).length;
  const educationScore = Math.min(educationCount * 5, 10);
  score += educationScore;
  
  // Keywords match score (10 points)
  const keywordScore = Math.min(text.split(' ').length / 50, 10);
  score += keywordScore;
  
  return Math.round(Math.min(score, 100));
};

// Extract text sections
const extractSections = (resumeText) => {
  const text = resumeText.toLowerCase();
  
  return {
    hasExperience: text.includes('experience') || text.includes('work'),
    hasEducation: text.includes('education') || text.includes('degree'),
    hasProjects: text.includes('project') || text.includes('portfolio'),
    hasSkills: text.includes('skill') || text.includes('technical'),
    wordCount: text.split(' ').length
  };
};

module.exports = {
  extractSkills,
  calculateResumeScore,
  extractSections,
  skillKeywords
};
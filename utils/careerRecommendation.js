// Career data with required skills and roadmaps
const careerData = [
  {
    careerName: 'Web Developer',
    requiredSkills: ['html', 'css', 'javascript', 'react', 'node.js', 'mongodb'],
    description: 'Build and maintain websites and web applications',
    roadmap: [
      { step: 1, title: 'Learn HTML & CSS', description: 'Master the basics of web structure and styling', resources: ['MDN Web Docs', 'freeCodeCamp'] },
      { step: 2, title: 'JavaScript Fundamentals', description: 'Learn programming logic and DOM manipulation', resources: ['JavaScript.info', 'Eloquent JavaScript'] },
      { step: 3, title: 'React Framework', description: 'Build dynamic user interfaces', resources: ['React Documentation', 'React Tutorial'] },
      { step: 4, title: 'Backend Development', description: 'Learn Node.js and Express', resources: ['Node.js Docs', 'Express.js Guide'] },
      { step: 5, title: 'Database Integration', description: 'Work with MongoDB and APIs', resources: ['MongoDB University', 'REST API Tutorial'] }
    ]
  },
  {
    careerName: 'Data Scientist',
    requiredSkills: ['python', 'machine learning', 'pandas', 'numpy', 'scikit-learn', 'sql'],
    description: 'Analyze data to extract insights and build predictive models',
    roadmap: [
      { step: 1, title: 'Python Programming', description: 'Master Python basics and syntax', resources: ['Python.org Tutorial', 'Automate the Boring Stuff'] },
      { step: 2, title: 'Data Analysis Libraries', description: 'Learn Pandas, NumPy, and Matplotlib', resources: ['Pandas Documentation', 'NumPy Tutorial'] },
      { step: 3, title: 'Statistics & Math', description: 'Understand statistical concepts', resources: ['Khan Academy Statistics', 'Think Stats'] },
      { step: 4, title: 'Machine Learning', description: 'Learn ML algorithms and scikit-learn', resources: ['Scikit-learn Docs', 'Coursera ML Course'] },
      { step: 5, title: 'Advanced ML & Deep Learning', description: 'TensorFlow, PyTorch, and neural networks', resources: ['TensorFlow Tutorial', 'PyTorch Documentation'] }
    ]
  },
  {
    careerName: 'Software Developer',
    requiredSkills: ['java', 'python', 'git', 'sql', 'agile', 'rest api'],
    description: 'Design and develop software applications and systems',
    roadmap: [
      { step: 1, title: 'Programming Fundamentals', description: 'Choose a language (Java/Python) and master basics', resources: ['Oracle Java Tutorial', 'Python Tutorial'] },
      { step: 2, title: 'Object-Oriented Programming', description: 'Learn OOP concepts and design patterns', resources: ['Head First Design Patterns', 'OOP Concepts'] },
      { step: 3, title: 'Version Control', description: 'Master Git and collaborative development', resources: ['Git Documentation', 'GitHub Learning Lab'] },
      { step: 4, title: 'Database Management', description: 'Learn SQL and database design', resources: ['W3Schools SQL', 'Database Design Tutorial'] },
      { step: 5, title: 'Software Engineering', description: 'Agile methodologies and best practices', resources: ['Agile Manifesto', 'Clean Code Book'] }
    ]
  },
  {
    careerName: 'Cloud Engineer',
    requiredSkills: ['aws', 'docker', 'kubernetes', 'linux', 'devops', 'ci/cd'],
    description: 'Design and manage cloud infrastructure and services',
    roadmap: [
      { step: 1, title: 'Linux Fundamentals', description: 'Master command line and system administration', resources: ['Linux Command Line Tutorial', 'Ubuntu Documentation'] },
      { step: 2, title: 'Cloud Platforms', description: 'Learn AWS, Azure, or Google Cloud', resources: ['AWS Training', 'Azure Learning Path'] },
      { step: 3, title: 'Containerization', description: 'Docker and container orchestration', resources: ['Docker Documentation', 'Docker Tutorial'] },
      { step: 4, title: 'Kubernetes', description: 'Container orchestration and management', resources: ['Kubernetes Documentation', 'K8s Tutorial'] },
      { step: 5, title: 'DevOps Practices', description: 'CI/CD pipelines and automation', resources: ['Jenkins Tutorial', 'GitLab CI/CD'] }
    ]
  },
  {
    careerName: 'AI Engineer',
    requiredSkills: ['python', 'tensorflow', 'pytorch', 'machine learning', 'artificial intelligence', 'deep learning'],
    description: 'Develop AI systems and machine learning models',
    roadmap: [
      { step: 1, title: 'Python & Math', description: 'Strong programming and mathematical foundation', resources: ['Python Tutorial', 'Linear Algebra Course'] },
      { step: 2, title: 'Machine Learning', description: 'ML algorithms and frameworks', resources: ['Andrew Ng Course', 'Scikit-learn Tutorial'] },
      { step: 3, title: 'Deep Learning', description: 'Neural networks and deep learning', resources: ['Deep Learning Specialization', 'Neural Networks Course'] },
      { step: 4, title: 'AI Frameworks', description: 'TensorFlow and PyTorch mastery', resources: ['TensorFlow Certification', 'PyTorch Tutorials'] },
      { step: 5, title: 'Specialized AI', description: 'Computer vision, NLP, or robotics', resources: ['OpenCV Tutorial', 'NLTK Documentation'] }
    ]
  }
];

// Calculate career match percentage
const calculateCareerMatch = (userSkills, careerSkills) => {
  if (!userSkills || userSkills.length === 0) return 0;
  
  const matchingSkills = userSkills.filter(skill => 
    careerSkills.some(careerSkill => 
      skill.toLowerCase().includes(careerSkill.toLowerCase()) ||
      careerSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );
  
  return Math.round((matchingSkills.length / careerSkills.length) * 100);
};

// Get career recommendations
const getCareerRecommendations = (userSkills) => {
  const recommendations = careerData.map(career => ({
    ...career,
    matchPercentage: calculateCareerMatch(userSkills, career.requiredSkills)
  }));
  
  return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

// Get skill gaps for a specific career
const getSkillGaps = (userSkills, careerName) => {
  const career = careerData.find(c => c.careerName === careerName);
  if (!career) return [];
  
  const missingSkills = career.requiredSkills.filter(skill => 
    !userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );
  
  return missingSkills;
};

module.exports = {
  careerData,
  getCareerRecommendations,
  getSkillGaps,
  calculateCareerMatch
};
const mongoose = require('mongoose');
const Career = require('./models/Career');
require('dotenv').config();

const careerData = [
  {
    careerName: 'Web Developer',
    requiredSkills: ['html', 'css', 'javascript', 'react', 'node.js', 'mongodb'],
    description: 'Build and maintain websites and web applications using modern technologies',
    roadmap: [
      { 
        step: 1, 
        title: 'Learn HTML & CSS', 
        description: 'Master the basics of web structure and styling', 
        resources: ['MDN Web Docs', 'freeCodeCamp', 'W3Schools'] 
      },
      { 
        step: 2, 
        title: 'JavaScript Fundamentals', 
        description: 'Learn programming logic and DOM manipulation', 
        resources: ['JavaScript.info', 'Eloquent JavaScript', 'Mozilla JavaScript Guide'] 
      },
      { 
        step: 3, 
        title: 'React Framework', 
        description: 'Build dynamic user interfaces with React', 
        resources: ['React Documentation', 'React Tutorial', 'Create React App'] 
      },
      { 
        step: 4, 
        title: 'Backend Development', 
        description: 'Learn Node.js and Express for server-side development', 
        resources: ['Node.js Docs', 'Express.js Guide', 'RESTful API Tutorial'] 
      },
      { 
        step: 5, 
        title: 'Database Integration', 
        description: 'Work with MongoDB and build full-stack applications', 
        resources: ['MongoDB University', 'Mongoose Documentation', 'Full-Stack Projects'] 
      }
    ],
    averageSalary: '$60,000 - $120,000'
  },
  {
    careerName: 'Data Scientist',
    requiredSkills: ['python', 'machine learning', 'pandas', 'numpy', 'scikit-learn', 'sql'],
    description: 'Analyze data to extract insights and build predictive models for business decisions',
    roadmap: [
      { 
        step: 1, 
        title: 'Python Programming', 
        description: 'Master Python basics and syntax for data science', 
        resources: ['Python.org Tutorial', 'Automate the Boring Stuff', 'Python for Data Science'] 
      },
      { 
        step: 2, 
        title: 'Data Analysis Libraries', 
        description: 'Learn Pandas, NumPy, and Matplotlib for data manipulation', 
        resources: ['Pandas Documentation', 'NumPy Tutorial', 'Matplotlib Gallery'] 
      },
      { 
        step: 3, 
        title: 'Statistics & Math', 
        description: 'Understand statistical concepts and mathematical foundations', 
        resources: ['Khan Academy Statistics', 'Think Stats', 'Statistical Learning'] 
      },
      { 
        step: 4, 
        title: 'Machine Learning', 
        description: 'Learn ML algorithms and scikit-learn implementation', 
        resources: ['Scikit-learn Docs', 'Coursera ML Course', 'Hands-On ML Book'] 
      },
      { 
        step: 5, 
        title: 'Advanced ML & Deep Learning', 
        description: 'Master TensorFlow, PyTorch, and neural networks', 
        resources: ['TensorFlow Tutorial', 'PyTorch Documentation', 'Deep Learning Specialization'] 
      }
    ],
    averageSalary: '$80,000 - $150,000'
  },
  {
    careerName: 'Software Developer',
    requiredSkills: ['java', 'python', 'git', 'sql', 'agile', 'rest api'],
    description: 'Design and develop software applications and systems using various programming languages',
    roadmap: [
      { 
        step: 1, 
        title: 'Programming Fundamentals', 
        description: 'Choose a language (Java/Python) and master programming basics', 
        resources: ['Oracle Java Tutorial', 'Python Tutorial', 'Programming Concepts'] 
      },
      { 
        step: 2, 
        title: 'Object-Oriented Programming', 
        description: 'Learn OOP concepts and design patterns', 
        resources: ['Head First Design Patterns', 'OOP Concepts', 'Clean Code'] 
      },
      { 
        step: 3, 
        title: 'Version Control', 
        description: 'Master Git and collaborative development workflows', 
        resources: ['Git Documentation', 'GitHub Learning Lab', 'Atlassian Git Tutorials'] 
      },
      { 
        step: 4, 
        title: 'Database Management', 
        description: 'Learn SQL and database design principles', 
        resources: ['W3Schools SQL', 'Database Design Tutorial', 'PostgreSQL Tutorial'] 
      },
      { 
        step: 5, 
        title: 'Software Engineering', 
        description: 'Agile methodologies and software development best practices', 
        resources: ['Agile Manifesto', 'Scrum Guide', 'Software Engineering Principles'] 
      }
    ],
    averageSalary: '$70,000 - $130,000'
  },
  {
    careerName: 'Cloud Engineer',
    requiredSkills: ['aws', 'docker', 'kubernetes', 'linux', 'devops', 'ci/cd'],
    description: 'Design and manage cloud infrastructure and services for scalable applications',
    roadmap: [
      { 
        step: 1, 
        title: 'Linux Fundamentals', 
        description: 'Master command line and system administration', 
        resources: ['Linux Command Line Tutorial', 'Ubuntu Documentation', 'Linux Academy'] 
      },
      { 
        step: 2, 
        title: 'Cloud Platforms', 
        description: 'Learn AWS, Azure, or Google Cloud services', 
        resources: ['AWS Training', 'Azure Learning Path', 'Google Cloud Training'] 
      },
      { 
        step: 3, 
        title: 'Containerization', 
        description: 'Docker and container orchestration fundamentals', 
        resources: ['Docker Documentation', 'Docker Tutorial', 'Container Best Practices'] 
      },
      { 
        step: 4, 
        title: 'Kubernetes', 
        description: 'Container orchestration and cluster management', 
        resources: ['Kubernetes Documentation', 'K8s Tutorial', 'Kubernetes the Hard Way'] 
      },
      { 
        step: 5, 
        title: 'DevOps Practices', 
        description: 'CI/CD pipelines and infrastructure automation', 
        resources: ['Jenkins Tutorial', 'GitLab CI/CD', 'Terraform Documentation'] 
      }
    ],
    averageSalary: '$85,000 - $160,000'
  },
  {
    careerName: 'AI Engineer',
    requiredSkills: ['python', 'tensorflow', 'pytorch', 'machine learning', 'artificial intelligence', 'deep learning'],
    description: 'Develop AI systems and machine learning models for intelligent applications',
    roadmap: [
      { 
        step: 1, 
        title: 'Python & Math', 
        description: 'Strong programming and mathematical foundation', 
        resources: ['Python Tutorial', 'Linear Algebra Course', 'Calculus for ML'] 
      },
      { 
        step: 2, 
        title: 'Machine Learning', 
        description: 'ML algorithms and frameworks fundamentals', 
        resources: ['Andrew Ng Course', 'Scikit-learn Tutorial', 'ML Yearning'] 
      },
      { 
        step: 3, 
        title: 'Deep Learning', 
        description: 'Neural networks and deep learning architectures', 
        resources: ['Deep Learning Specialization', 'Neural Networks Course', 'Deep Learning Book'] 
      },
      { 
        step: 4, 
        title: 'AI Frameworks', 
        description: 'TensorFlow and PyTorch mastery for production AI', 
        resources: ['TensorFlow Certification', 'PyTorch Tutorials', 'MLOps Practices'] 
      },
      { 
        step: 5, 
        title: 'Specialized AI', 
        description: 'Computer vision, NLP, or robotics specialization', 
        resources: ['OpenCV Tutorial', 'NLTK Documentation', 'Hugging Face Transformers'] 
      }
    ],
    averageSalary: '$90,000 - $180,000'
  },
  {
    careerName: 'Mobile Developer',
    requiredSkills: ['react native', 'flutter', 'swift', 'kotlin', 'mobile ui', 'api integration'],
    description: 'Create mobile applications for iOS and Android platforms',
    roadmap: [
      { 
        step: 1, 
        title: 'Mobile Development Basics', 
        description: 'Understand mobile app development principles', 
        resources: ['Mobile Dev Fundamentals', 'App Store Guidelines', 'Mobile UX Design'] 
      },
      { 
        step: 2, 
        title: 'Choose Platform', 
        description: 'Learn React Native, Flutter, or native development', 
        resources: ['React Native Docs', 'Flutter Documentation', 'iOS/Android Guides'] 
      },
      { 
        step: 3, 
        title: 'UI/UX Design', 
        description: 'Create intuitive and responsive mobile interfaces', 
        resources: ['Material Design', 'Human Interface Guidelines', 'Mobile Design Patterns'] 
      },
      { 
        step: 4, 
        title: 'API Integration', 
        description: 'Connect mobile apps with backend services', 
        resources: ['REST API Tutorial', 'GraphQL Mobile', 'Authentication Patterns'] 
      },
      { 
        step: 5, 
        title: 'App Store Deployment', 
        description: 'Deploy and maintain apps in app stores', 
        resources: ['App Store Connect', 'Google Play Console', 'App Marketing'] 
      }
    ],
    averageSalary: '$65,000 - $140,000'
  },
  {
    careerName: 'Cybersecurity Specialist',
    requiredSkills: ['network security', 'penetration testing', 'cryptography', 'incident response', 'security tools', 'compliance'],
    description: 'Protect organizations from cyber threats and ensure data security',
    roadmap: [
      { 
        step: 1, 
        title: 'Security Fundamentals', 
        description: 'Learn basic cybersecurity concepts and principles', 
        resources: ['CompTIA Security+', 'Cybersecurity Basics', 'NIST Framework'] 
      },
      { 
        step: 2, 
        title: 'Network Security', 
        description: 'Understand network protocols and security measures', 
        resources: ['Network+ Certification', 'Wireshark Tutorial', 'Firewall Configuration'] 
      },
      { 
        step: 3, 
        title: 'Penetration Testing', 
        description: 'Learn ethical hacking and vulnerability assessment', 
        resources: ['Kali Linux', 'Metasploit Guide', 'OWASP Top 10'] 
      },
      { 
        step: 4, 
        title: 'Incident Response', 
        description: 'Handle security incidents and forensic analysis', 
        resources: ['SANS Incident Response', 'Digital Forensics', 'Malware Analysis'] 
      },
      { 
        step: 5, 
        title: 'Advanced Security', 
        description: 'Specialize in advanced security domains', 
        resources: ['CISSP Certification', 'Cloud Security', 'IoT Security'] 
      }
    ],
    averageSalary: '$75,000 - $150,000'
  },
  {
    careerName: 'DevOps Engineer',
    requiredSkills: ['docker', 'kubernetes', 'jenkins', 'terraform', 'monitoring', 'scripting'],
    description: 'Bridge development and operations to improve software delivery',
    roadmap: [
      { 
        step: 1, 
        title: 'Linux & Scripting', 
        description: 'Master Linux systems and automation scripting', 
        resources: ['Linux Administration', 'Bash Scripting', 'Python for DevOps'] 
      },
      { 
        step: 2, 
        title: 'Version Control & CI/CD', 
        description: 'Implement continuous integration and deployment', 
        resources: ['Git Advanced', 'Jenkins Pipeline', 'GitLab CI/CD'] 
      },
      { 
        step: 3, 
        title: 'Containerization', 
        description: 'Docker and container orchestration', 
        resources: ['Docker Mastery', 'Kubernetes Administration', 'Container Security'] 
      },
      { 
        step: 4, 
        title: 'Infrastructure as Code', 
        description: 'Automate infrastructure provisioning', 
        resources: ['Terraform Tutorial', 'Ansible Playbooks', 'CloudFormation'] 
      },
      { 
        step: 5, 
        title: 'Monitoring & Observability', 
        description: 'Implement monitoring and logging solutions', 
        resources: ['Prometheus & Grafana', 'ELK Stack', 'Application Monitoring'] 
      }
    ],
    averageSalary: '$80,000 - $155,000'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careerlyzer');
    console.log('Connected to MongoDB');

    // Clear existing career data
    await Career.deleteMany({});
    console.log('Cleared existing career data');

    // Insert new career data
    await Career.insertMany(careerData);
    console.log('Career data seeded successfully');

    console.log(`Inserted ${careerData.length} career paths:`);
    careerData.forEach(career => {
      console.log(`- ${career.careerName}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
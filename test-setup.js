const mongoose = require('mongoose');
require('dotenv').config();

const testSetup = async () => {
  console.log('🧪 Testing CareerLyzer Setup...\n');

  // Test 1: MongoDB Connection
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careerlyzer');
    console.log('✅ MongoDB connection: SUCCESS');
    await mongoose.disconnect();
  } catch (error) {
    console.log('❌ MongoDB connection: FAILED');
    console.log('   Error:', error.message);
  }

  // Test 2: Environment Variables
  const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];
  let envVarsOk = true;
  
  requiredEnvVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`✅ Environment variable ${varName}: SET`);
    } else {
      console.log(`❌ Environment variable ${varName}: MISSING`);
      envVarsOk = false;
    }
  });

  // Test 3: Dependencies Check
  try {
    const packageJson = require('./package.json');
    const clientPackageJson = require('./client/package.json');
    
    console.log('✅ Backend dependencies: LOADED');
    console.log('✅ Frontend dependencies: LOADED');
    
    console.log(`\n📦 Backend Dependencies (${Object.keys(packageJson.dependencies).length}):`);
    Object.keys(packageJson.dependencies).forEach(dep => {
      console.log(`   - ${dep}`);
    });
    
    console.log(`\n📦 Frontend Dependencies (${Object.keys(clientPackageJson.dependencies).length}):`);
    Object.keys(clientPackageJson.dependencies).forEach(dep => {
      console.log(`   - ${dep}`);
    });
    
  } catch (error) {
    console.log('❌ Dependencies check: FAILED');
    console.log('   Error:', error.message);
  }

  // Test 4: File Structure Check
  const fs = require('fs');
  const requiredFiles = [
    'server.js',
    'package.json',
    '.env',
    'models/User.js',
    'models/Career.js',
    'routes/auth.js',
    'routes/resume.js',
    'routes/career.js',
    'middleware/auth.js',
    'utils/aiAnalysis.js',
    'utils/careerRecommendation.js',
    'client/package.json',
    'client/src/App.js',
    'client/src/components/Dashboard.js',
    'client/src/components/Login.js',
    'client/src/components/Register.js'
  ];

  console.log('\n📁 File Structure Check:');
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}: EXISTS`);
    } else {
      console.log(`❌ ${file}: MISSING`);
    }
  });

  console.log('\n🎯 Setup Test Complete!');
  console.log('\nNext Steps:');
  console.log('1. Start MongoDB: brew services start mongodb-community (macOS)');
  console.log('2. Install dependencies: npm install && cd client && npm install');
  console.log('3. Seed database: npm run seed');
  console.log('4. Start development: npm run dev');
  console.log('5. Open browser: http://localhost:3000');
};

testSetup().catch(console.error);
#!/bin/bash

# CareerLyzer Development Startup Script

echo "🚀 Starting CareerLyzer Development Environment..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   macOS: brew services start mongodb-community"
    echo "   Ubuntu: sudo systemctl start mongod"
    echo "   Windows: net start MongoDB"
    exit 1
fi

echo "✅ MongoDB is running"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating default .env file..."
    cat > .env << EOL
MONGODB_URI=mongodb://localhost:27017/careerlyzer
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
EOL
    echo "✅ Created .env file with default values"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install && cd ..
fi

# Seed database if needed
echo "🌱 Seeding database with career data..."
npm run seed

echo "🎯 Starting development servers..."
echo "   Backend: http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Start both servers using concurrently (if available) or in background
if command -v concurrently &> /dev/null; then
    npx concurrently "npm run server" "npm run client"
else
    echo "Installing concurrently for better development experience..."
    npm install -g concurrently
    npx concurrently "npm run server" "npm run client"
fi
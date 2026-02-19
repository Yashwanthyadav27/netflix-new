const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'https://netflix-frontend.onrender.com'],
  credentials: true
}));
app.use(express.json());

// Serve static files from dist folder (for production)
app.use(express.static(path.join(__dirname, '../dist')));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// File-based storage
const DATA_FILE = path.join(__dirname, 'users.json');

// Initialize users file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper functions
const getUsers = () => {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

const saveUsers = (users) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return user;
};

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register Endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, mobile, fullName, profileName, dateOfBirth } = req.body;

    // Check if user exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      mobile,
      fullName,
      profileName,
      dateOfBirth,
      createdAt: new Date().toISOString(),
    };

    addUser(user);

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        profileName: user.profileName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        profileName: user.profileName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Verify Token Endpoint
app.get('/api/auth/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const users = getUsers();
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update Profile Endpoint
app.put('/api/auth/profile', async (req, res) => {
  try {
    console.log('Profile update request received:', req.body);
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decoded, userId:', decoded.userId);
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === decoded.userId);
    
    if (userIndex === -1) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const { fullName, profileName, mobile, dateOfBirth, bio, location, favoriteGenre } = req.body;
    console.log('Updating user with data:', { fullName, profileName, mobile, dateOfBirth, bio, location, favoriteGenre });

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      fullName: fullName || users[userIndex].fullName,
      profileName: profileName || users[userIndex].profileName,
      mobile: mobile || users[userIndex].mobile,
      dateOfBirth: dateOfBirth || users[userIndex].dateOfBirth,
      bio: bio !== undefined ? bio : users[userIndex].bio,
      location: location !== undefined ? location : users[userIndex].location,
      favoriteGenre: favoriteGenre !== undefined ? favoriteGenre : users[userIndex].favoriteGenre,
    };

    saveUsers(users);
    console.log('User saved successfully');

    // Remove password from response
    const { password, ...userWithoutPassword } = users[userIndex];
    res.json({ message: 'Profile updated successfully', user: userWithoutPassword });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Serve React app for all other routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

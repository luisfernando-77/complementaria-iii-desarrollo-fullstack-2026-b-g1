
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error(
    'JWT_SECRET must contain at least 32 characters.'
  );
}

// Allow requests from the React frontend.
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));

app.use(express.json());

// Demo user with a hashed password.
const demoUser = {
  id: 1,
  username: 'student',
  passwordHash: bcrypt.hashSync('Student123!', 10),
};

// Example tasks.
const tasks = [
  { id: 1, title: 'Study JWT authentication', done: true },
  { id: 2, title: 'Connect React with Express', done: false },
  { id: 3, title: 'Write automated tests', done: false },
];

// Public health endpoint.
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    application: 'TaskSecure',
  });
});

// Login endpoint.
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return res.status(400).json({
      message: 'Username and password are required.',
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    demoUser.passwordHash
  );

  if (
    username !== demoUser.username ||
    !validPassword
  ) {
    return res.status(401).json({
      message: 'Invalid credentials.',
    });
  }

  const token = jwt.sign(
    {
      sub: String(demoUser.id),
      username: demoUser.username,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
      algorithm: 'HS256',
    }
  );

  return res.json({
    token,
    tokenType: 'Bearer',
    expiresIn: 3600,
  });
});

// JWT authentication middleware.
function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Authentication token required.',
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
}

// Protected endpoint.
app.get('/api/tasks', requireAuth, (req, res) => {
  res.json({
    user: req.user.username,
    tasks,
  });
});

// Unknown API routes.
app.use('/api', (req, res) => {
  res.status(404).json({
    message: 'Endpoint not found.',
  });
});

// Start server only when executed directly.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `TaskSecure API running on http://localhost:${PORT}`
    );
  });
}

module.exports = app;


import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createRequire } from 'node:module';

// Load the CommonJS Express application.
const require = createRequire(import.meta.url);

// Configure the test environment.
process.env.JWT_SECRET =
  'tasksecure_test_secret_2026_at_least_32_characters';

process.env.FRONTEND_URL = 'http://localhost:5173';

const app = require('../server.js');

describe('TaskSecure Authentication API', () => {
  it('should return a JWT for valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'student',
        password: 'Student123!',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.tokenType).toBe('Bearer');
  });

  it('should reject incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'student',
        password: 'wrong-password',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      'Invalid credentials.'
    );
  });

  it('should block access without a token', async () => {
    const response = await request(app)
      .get('/api/tasks');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      'Authentication token required.'
    );
  });

  it('should allow access with a valid JWT', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'student',
        password: 'Student123!',
      });

    expect(loginResponse.status).toBe(200);

    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toBe('student');
    expect(response.body.tasks).toHaveLength(3);
  });
});

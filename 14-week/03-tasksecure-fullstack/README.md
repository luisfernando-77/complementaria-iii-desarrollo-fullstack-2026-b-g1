# TaskSecure — Secure Fullstack Application

## Project Overview

TaskSecure is a fullstack task management application developed for the Week 14 assignment of Complementaria III — Fullstack Development.

The application allows users to authenticate with JWT and retrieve protected tasks through a REST API.

## Technologies

**Backend**
- Node.js
- Express
- JSON Web Tokens (JWT)
- bcryptjs
- CORS
- Vitest and Supertest

**Frontend**
- React
- Vite
- JavaScript
- React Testing Library
- Vitest

**Deployment**
- Docker
- Docker Compose
- Nginx

## Features

- Login with username and password.
- JWT access token generation.
- Protected REST API endpoints.
- CORS configuration for the frontend.
- Display of protected tasks.
- Handling of invalid credentials and expired tokens.
- Logout functionality.
- Automated backend and frontend tests.
- Containerized deployment with Docker.

## Project Structure

```text
03-tasksecure-fullstack/
├── backend/
│   ├── tests/
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── compose.yaml
└── README.md
```

## Security & run

TaskSecure uses JWT authentication to protect access to its REST API. Users sign in with valid credentials, and the backend returns a signed access token with an expiration time. The React frontend sends this token in the Authorization header when requesting protected tasks. Express verifies the token before allowing access to the protected endpoint. Requests without a valid token receive an HTTP 401 Unauthorized response. The backend uses CORS to control requests from the configured frontend origin, while Nginx proxies API requests when running with Docker. The project includes four backend tests and three frontend tests, covering successful authentication, protected requests, and error cases. Docker Compose starts the backend and frontend services together, making the application easy to run and verify.

## Demo Credentials

The application uses a demonstration account.

- Username: `student`
- Password: `Student123!`

These credentials are only for academic testing.

## Run Locally

### Backend

Open a terminal inside `backend` and install the dependencies:

```bash
npm install
```

Create a local `.env` file using the following structure:

```dotenv
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace_with_a_random_secret_of_at_least_32_characters
```

Start the backend:

```bash
node server.js
```

The backend runs at `http://localhost:3000`.

### Frontend

Open another terminal inside `frontend`:

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Run with Docker

Create the `backend/.env` file with a strong local JWT secret. Then, from the project root, run:

```bash
docker compose up --build -d
```

Access the application at:

- Frontend: `http://localhost:8080`
- Backend health endpoint: `http://localhost:3001/api/health`

Stop the containers with:

```bash
docker compose down
```

## Automated Tests

### Backend tests

From the `backend` directory, run:

```bash
npx vitest run tests/auth.test.mjs
```

Four backend tests verify successful login, invalid credentials, missing authentication tokens, and access using a valid JWT.

### Frontend tests

From the `frontend` directory, run:

```bash
npx vitest run src/App.test.jsx --environment jsdom
```

Three frontend tests verify that the login form renders, invalid credentials display an error, and protected tasks can be retrieved after authentication.

**Test results:** 7 automated tests passed during development.

## API Endpoints

| Method | Endpoint | Authentication |
|---|---|---|
| GET | `/api/health` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/tasks` | JWT required |

## Academic Information

- Course: Complementaria III — Fullstack Development
- Assignment: Week 14 — Secure and Tested Fullstack Application
- Delivery: Individual
- Version: 1.0.0

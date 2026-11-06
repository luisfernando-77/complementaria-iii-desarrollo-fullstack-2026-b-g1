
import { useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tasksLoaded, setTasksLoaded] = useState(false);

  const handleLogout = () => {
    setToken('');
    setTasks([]);
    setTasksLoaded(false);
    setUser('');
    setPassword('');
    setError('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      if (!data.token) {
        throw new Error('Authentication token not received.');
      }

      setToken(data.token);
      setUser(username);
      setPassword('');
      setTasks([]);
      setTasksLoaded(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the server.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    setTasksLoaded(false);

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        handleLogout();
        setError('Session expired. Please log in again.');
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load tasks.');
      }

      setTasks(data.tasks);
      setTasksLoaded(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Network error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <h1>TaskSecure</h1>
          <p>Secure Fullstack Task Manager</p>
        </header>

        {!token ? (
          <section className="card">
            <h2>Sign In</h2>
            <p>
              Access your protected tasks using
              JWT authentication.
            </p>

            <form onSubmit={handleLogin}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter username"
                autoComplete="username"
                required
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="demo">
              <strong>Demo Credentials</strong>
              <p>Username: student</p>
              <p>Password: Student123!</p>
            </div>
          </section>
        ) : (
          <section className="card">
            <div className="dashboard-header">
              <div>
                <h2>My Tasks</h2>
                <p>Welcome, {user}!</p>
              </div>

              <button
                type="button"
                className="logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

            <p>
              Your tasks are protected with JWT authentication.
            </p>

            <button
              type="button"
              onClick={loadTasks}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load Protected Tasks'}
            </button>

            {loading && (
              <p role="status">Loading tasks...</p>
            )}

            {!loading && tasksLoaded && (
              <div className="task-list">
                {tasks.length === 0 ? (
                  <p>No tasks found.</p>
                ) : (
                  tasks.map((task) => (
                    <div className="task" key={task.id}>
                      <span>{task.title}</span>

                      <span
                        className={
                          task.done ? 'done' : 'pending'
                        }
                      >
                        {task.done ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {!loading && !tasksLoaded && !error && (
              <p className="hint">
                Click the button to retrieve your protected tasks.
              </p>
            )}
          </section>
        )}

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;

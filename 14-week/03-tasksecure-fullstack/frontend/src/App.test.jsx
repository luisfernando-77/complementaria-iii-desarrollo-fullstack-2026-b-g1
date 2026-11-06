
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import App from './App';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('TaskSecure Frontend', () => {
  it('shows the login form', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Sign In' })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Username')
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Password')
    ).toBeInTheDocument();
  });

  it('shows an error for invalid credentials', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({
          message: 'Invalid credentials.',
        }),
      })
    );

    render(<App />);

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'student' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrong-password' },
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Sign In' })
    );

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent('Invalid credentials.');

    expect(
      screen.getByRole('heading', { name: 'Sign In' })
    ).toBeInTheDocument();
  });

  it('allows login and retrieves protected tasks', async () => {
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          token: 'test-jwt-token',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          user: 'student',
          tasks: [
            {
              id: 1,
              title: 'Study JWT authentication',
              done: true,
            },
          ],
        }),
      });

    vi.stubGlobal('fetch', mockFetch);

    render(<App />);

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'student' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Student123!' },
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Sign In' })
    );

    expect(
      await screen.findByRole('heading', { name: 'My Tasks' })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Load Protected Tasks',
      })
    );

    expect(
      await screen.findByText('Study JWT authentication')
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockFetch).toHaveBeenLastCalledWith(
        'http://localhost:3000/api/tasks',
        {
          headers: {
            Authorization: 'Bearer test-jwt-token',
          },
        }
      );
    });
  });
});

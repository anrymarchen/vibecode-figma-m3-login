import type { User } from '../types/User';

type ErrorResponse = {
  error?: string;
};

async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  const result = await response.json() as T & ErrorResponse;

  if (!response.ok) {
    throw new Error(result.error ?? 'Request failed.');
  }

  return result;
}

export async function getCurrentUser(): Promise<User> {
  const { user } = await request<{ user: User }>(
    '/api/auth/me',
  );

  return user;
}

export async function login(
  loginValue: string,
  password: string,
  keepLoggedIn: boolean,
): Promise<User> {
  const result = await request<{ user: User }>(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        login: loginValue,
        password,
        keepLoggedIn,
      }),
    },
  );

  return result.user;
}

export async function forgotPassword(loginValue: string): Promise<string> {
  const result = await request<{ message: string }>(
    '/api/auth/forgot-password',
    {
      method: 'POST',
      body: JSON.stringify({ login: loginValue }),
    },
  );

  return result.message;
}

export async function register(
  loginValue: string,
  password: string,
  repeatPassword: string,
): Promise<User> {
  const { user } = await request<{ user: User }>(
    '/api/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({
        login: loginValue,
        password,
        repeatPassword,
      }),
    },
  );

  return user;
}

export async function logout(): Promise<void> {
  await request('/api/auth/logout', {
    method: 'POST',
  });
}

export async function updateCurrentUser(
  codename1: string,
  codename2: string,
): Promise<User> {
  const { user } = await request<{ user: User }>(
    '/api/users/me',
    {
      method: 'PATCH',
      body: JSON.stringify({
        codename1,
        codename2,
      }),
    },
  );

  return user;
}

export async function deleteCurrentUser(): Promise<void> {
  await request('/api/users/me', {
    method: 'DELETE',
  });
}
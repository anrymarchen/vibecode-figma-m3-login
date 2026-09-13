import type { Connect } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { ServerResponse } from 'node:http';

export interface User {
  id: string;
  login: string;
  password: string;
  codename1: string;
  codename2: string;
  deletable: boolean;
  createdAt: string;
  updatedAt: string;
}

type PublicUser = Omit<User, 'password'>;

const dataPath = path.resolve(process.cwd(), '.data', 'users.json');
const sessions = new Map<string, string>();

function readUsers(): User[] {
  if (!fs.existsSync(dataPath)) {
    const now = new Date().toISOString();
    return [{
      id: 'admin',
      login: 'admin',
      password: 'admin',
      codename1: '',
      codename2: '',
      deletable: false,
      createdAt: now,
      updatedAt: now,
    }];
  }
  return JSON.parse(fs.readFileSync(dataPath, 'utf8')) as User[];
}

function writeUsers(users: User[]) {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

function publicUser(user: User): PublicUser {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== 'password'),
  ) as PublicUser;
}

function body(req: Connect.IncomingMessage): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: Buffer) => { data += chunk.toString(); });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) as Record<string, string> : {}); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function send(res: ServerResponse, status: number, value: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(value));
}

function sessionUser(req: Connect.IncomingMessage, users: User[]) {
  const cookie = req.headers.cookie?.match(/session=([^;]+)/)?.[1];
  const userId = cookie ? sessions.get(cookie) : undefined;
  return users.find((user) => user.id === userId);
}

export function authMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (!req.url?.startsWith('/api/auth') && !req.url?.startsWith('/api/users')) {
      next();
      return;
    }

    try {
      const users = readUsers();
      const method = req.method ?? 'GET';
      const url = req.url.split('?')[0];

      if (url === '/api/auth/register' && method === 'POST') {
        const input = await body(req);
        if (!input.login || !input.password || input.password !== input.repeatPassword) {
          send(res, 400, { error: 'Login and matching passwords are required.' });
          return;
        }
        if (users.some((user) => user.login === input.login)) {
          send(res, 409, { error: 'That login is already in use.' });
          return;
        }
        const now = new Date().toISOString();
        const user: User = {
          id: crypto.randomUUID(),
          login: input.login,
          password: input.password,
          codename1: '',
          codename2: '',
          deletable: true,
          createdAt: now,
          updatedAt: now,
        };
        users.push(user);
        writeUsers(users);
        const token = crypto.randomUUID();
        sessions.set(token, user.id);
        res.setHeader('Set-Cookie', `session=${token}; Path=/; HttpOnly; SameSite=Lax`);
        send(res, 201, { user: publicUser(user) });
        return;
      }

      if (url === '/api/auth/login' && method === 'POST') {
        const input = await body(req);
        const user = users.find((candidate) => candidate.login === input.login && candidate.password === input.password);
        if (!user) {
          send(res, 401, { error: 'Invalid login or password.' });
          return;
        }
        const token = crypto.randomUUID();
        sessions.set(token, user.id);
        res.setHeader('Set-Cookie', `session=${token}; Path=/; HttpOnly; SameSite=Lax`);
        send(res, 200, { user: publicUser(user) });
        return;
      }

      if (url === '/api/auth/logout' && method === 'POST') {
        const token = req.headers.cookie?.match(/session=([^;]+)/)?.[1];
        if (token) sessions.delete(token);
        res.setHeader('Set-Cookie', 'session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
        send(res, 200, { ok: true });
        return;
      }

      const user = sessionUser(req, users);
      if (url === '/api/auth/me' && method === 'GET') {
        if (!user) { send(res, 401, { error: 'Not authenticated.' }); return; }
        send(res, 200, { user: publicUser(user) });
        return;
      }

      if (url === '/api/users/me' && method === 'PATCH') {
        if (!user) { send(res, 401, { error: 'Not authenticated.' }); return; }
        const input = await body(req);
        user.codename1 = input.codename1 ?? user.codename1;
        user.codename2 = input.codename2 ?? user.codename2;
        user.updatedAt = new Date().toISOString();
        writeUsers(users);
        send(res, 200, { user: publicUser(user) });
        return;
      }

      if (url === '/api/users/me' && method === 'DELETE') {
        if (!user) { send(res, 401, { error: 'Not authenticated.' }); return; }
        if (!user.deletable) { send(res, 403, { error: 'This account cannot be deleted.' }); return; }
        writeUsers(users.filter((candidate) => candidate.id !== user.id));
        const token = req.headers.cookie?.match(/session=([^;]+)/)?.[1];
        if (token) sessions.delete(token);
        res.setHeader('Set-Cookie', 'session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
        send(res, 200, { ok: true });
        return;
      }

      send(res, 404, { error: 'Not found.' });
    } catch (error) {
      send(res, 400, { error: error instanceof Error ? error.message : 'Request failed.' });
    }
  };
}

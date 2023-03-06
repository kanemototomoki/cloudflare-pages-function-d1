import type { D1Database } from '@cloudflare/workers-types';
import { handle } from 'hono/cloudflare-pages';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database;
};

type Todo = {
  title: string;
};

export type TodoResponse = Todo & {
  id: number;
};

const app = new Hono<{ Bindings: Bindings }>();

if (import.meta?.env?.DEV) {
  app.use(
    '*',
    cors({
      origin: '*',
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    })
  );
  app.options('*', (c) => {
    return c.text('', 204);
  });
}

const route = app.get('/todos', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM todos;'
  ).all<TodoResponse>();
  return c.jsonT(results || []);
});

export type AppType = typeof route;
export const onRequest = handle(app, '/api');

import type { D1Database } from '@cloudflare/workers-types';
import { handle } from 'hono/cloudflare-pages';
import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

type Todo = {
  title: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const route = app.get('/todos', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM todos;'
  ).all<Todo>();
  return c.jsonT(results || []);
});

export type AppType = typeof route;
export const onRequest = handle(app, '/api');

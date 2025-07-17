import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'Story Generator Backend API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
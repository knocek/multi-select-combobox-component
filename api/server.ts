import cors from 'cors';
import express from 'express';

import itemsRoutes from './routes/items.routes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Mock API is running.',
  });
});

app.use('/items', itemsRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found.',
  });
});

app.use(
  (error: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    void _next;

    console.error('Error handling request:', error);

    res.status(500).json({
      message: 'Internal server error.',
    });
  },
);

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});

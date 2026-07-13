import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from './routes/index.js';
import { errorHandler, notFound } from './middleware/error.js';
export const createApp = () => {
  const app = express();
  app.use(pinoHttp());
  app.use(cors({ origin: (_origin, callback) => callback(null, true), credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.get('/health', (_req, res) =>
    res.json({ success: true, message: 'Healthy', data: { status: 'ok' } }),
  );
  const swagger = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: { title: 'BugForge API', version: '1.0.0' },
      components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } } },
    },
    apis: [],
  });
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));
  app.use('/api/v1', router);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};

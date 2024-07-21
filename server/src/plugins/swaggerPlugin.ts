import { ElysiaSwaggerConfig, swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';

export const swaggerPlugin = (app: Elysia): Elysia => {
  const swaggerOptions: ElysiaSwaggerConfig<'/api-docs'> = {
    provider: 'scalar',
    documentation: {
      info: {
        title: 'Elysia Documentation',
        version: '1.0.0',
      },
      tags: [
        { name: 'API', description: 'General endpoints' },
        { name: 'Auth', description: 'Authentication endpoints' },
      ],
    },
    path: '/api-docs',
  };

  app.use(swagger(swaggerOptions));
  return app;
};

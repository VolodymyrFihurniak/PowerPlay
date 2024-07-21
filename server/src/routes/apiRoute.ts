import BaseRoute from './baseRoute';
import { Elysia } from 'elysia';

class APIRoute extends BaseRoute {
  private app: Elysia;
  constructor(name: string) {
    super(name);
    this.app = new Elysia({ name, prefix: `/${name.toLowerCase()}` as '' });
  }

  public configureRoutes(): Elysia {
    this.app.get(
      '/version',
      () => {
        return JSON.stringify({ version: process.env.npm_package_version });
      },
      {
        detail: {
          tags: ['API'],
          description: 'Get the version of the API',
          summary: 'Get API version',
          responses: { 200: { description: 'API version' }, 500: { description: 'Internal server error' } },
        },
      }
    );
    return this.app;
  }
}

export default APIRoute;

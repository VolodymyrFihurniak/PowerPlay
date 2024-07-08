import BaseRoute from './baseRoute';
import { Elysia } from 'elysia';

class ApiRoute extends BaseRoute {
  constructor(elysia: Elysia, name: string) {
    super(elysia, name);
  }

  public configureRoutes(): Elysia {
    return this.elysia.get('/api/version', () => {
      return JSON.stringify({ version: process.env.npm_package_version });
    });
  }
}

export default ApiRoute;

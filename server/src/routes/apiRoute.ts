import BaseRoute from './baseRoute';
import { Elysia } from 'elysia';

class APIRoute extends BaseRoute {
  private elysia: Elysia;
  constructor(name: string) {
    super(name);
    this.elysia = new Elysia({ name, prefix: `/${name.toLowerCase()}` });
  }

  public configureRoutes(): Elysia {
    this.elysia.get('/version', () => {
      return JSON.stringify({ version: process.env.npm_package_version });
    });
    return this.elysia;
  }
}

export default APIRoute;

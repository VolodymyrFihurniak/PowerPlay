import { Elysia } from 'elysia';

import { APIController } from '@controllers/apiController';

import { getAPIVersionDescription } from '@docs/apiRouteDescription';

import BaseRoute from '@routes/baseRoute';

class APIRoute extends BaseRoute {
  private app: Elysia;
  private controller: APIController;
  constructor(name: string) {
    super(name);
    this.app = new Elysia({ name, prefix: `/${name.toLowerCase()}` as '' });
    this.controller = new APIController();
  }

  public configureRoutes(): Elysia {
    this.app.get('/version', this.controller.getAPIVersion, getAPIVersionDescription);
    return this.app;
  }
}

export default APIRoute;

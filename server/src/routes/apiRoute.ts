import { Elysia, t } from 'elysia';

import { APIController } from '@controllers/apiController';

import { GETAPIVersionDescription } from '@docs/apiRouteDescription';

import { Config } from '@entities/config';

import BaseRoute from '@routes/baseRoute';

class APIRoute extends BaseRoute {
  private app: Elysia;
  private controller: APIController;
  constructor(name: string, config: Config) {
    super(name, config);
    this.app = new Elysia({ name, prefix: `/${name.toLowerCase()}` as '' });
    this.controller = new APIController();
  }

  public configureRoutes(): Elysia {
    this.app.get('/version', this.controller.getAPIVersion, GETAPIVersionDescription);
    return this.app;
  }
}

export default APIRoute;

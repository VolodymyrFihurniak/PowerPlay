import { Elysia, t } from 'elysia';

import { AuthController } from '@controllers/authController';

import { GETAUTHVerify } from '@docs/authRouteDescription';

import { Config } from '@entities/config';

import BaseRoute from '@routes/baseRoute';

class AuthRoute extends BaseRoute {
  private app: Elysia;
  private controller: AuthController;
  constructor(name: string, config: Config) {
    super(name, config);
    this.app = new Elysia({ name, prefix: `/${name.toLowerCase()}` as '' });
    this.controller = new AuthController(config);
  }

  public configureRoutes(): Elysia {
    this.app.get('/verify', this.controller.getVerify, {
      headers: t.Object({
        authorization: t.TemplateLiteral('Bearer ${string}'),
      }),
      ...GETAUTHVerify,
    });
    return this.app;
  }
}

export default AuthRoute;

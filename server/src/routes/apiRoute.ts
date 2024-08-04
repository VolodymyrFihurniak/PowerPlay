import { Elysia, t } from 'elysia';

import { AuthContext } from '@src/interfaces/authRepository';

import { APIController } from '@controllers/apiController';

import { GETAPIVersionDescription } from '@docs/apiRouteDescription';

import { Config } from '@entities/config';

import { authMiddleware } from '@middlewares/authMiddleware';

import { jwtAccessPlugin } from '@plugins/authPlugin';

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
    this.app
      .guard({
        headers: t.Object({
          authorization: t.TemplateLiteral('Bearer ${string}'),
        }),
      })
      .use(jwtAccessPlugin(this.config))
      .get('/version', this.controller.getAPIVersion, {
        beforeHandle: async ({ jwtAccess, headers, set }) =>
          authMiddleware({ jwtAccess, headers, set } as unknown as AuthContext),
        ...GETAPIVersionDescription,
      })
      .get('/test', async ({ jwtAccess }) => jwtAccess.sign({ test: 'test' }));
    return this.app;
  }
}

export default APIRoute;

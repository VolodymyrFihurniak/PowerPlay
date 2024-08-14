import { PrismaClient } from '@prisma/client';
import { Elysia, t } from 'elysia';

import { AuthContext } from '@src/interfaces/authRepository';

import { APIController } from '@controllers/apiController';

import { GETAPIVersionDescription } from '@docs/apiRouteDescription';

import { Config } from '@entities/config';

import { authMiddleware } from '@middlewares/authMiddleware';

import { jwtAccessPlugin, jwtRefreshPlugin } from '@plugins/authPlugin';

import BaseRoute from '@routes/baseRoute';

class APIRoute extends BaseRoute {
  private app: Elysia;
  private controller: APIController;
  constructor(name: string, dbClient: PrismaClient, config: Config) {
    super(name, dbClient, config);
    this.app = new Elysia({ name, prefix: `/${name.toLowerCase()}` as '' });
    this.controller = new APIController();
  }

  public configureRoutes(): Elysia {
    this.app.guard(
      {
        headers: t.Object({
          authorization: t.TemplateLiteral('Bearer ${string}'),
        }),
      },
      (app) =>
        app
          .use(jwtAccessPlugin(this.config))
          .use(jwtRefreshPlugin(this.config))
          .resolve(async ({ jwtAccess, headers, set }) =>
            authMiddleware({ jwtAccess, headers, set } as unknown as AuthContext)
          )
          .get('/version', this.controller.getAPIVersion, GETAPIVersionDescription)
    );
    return this.app;
  }
}

export default APIRoute;

import { PrismaClient } from '@prisma/client';
import { Elysia, t } from 'elysia';

import { AuthController } from '@controllers/authController';

import {
  POSTGenerateAccessToken,
  POSTGenerateRefreshToken,
} from '@docs/authRouteDescription';

import { Config } from '@entities/config';

import { jwtAccessPlugin, jwtRefreshPlugin } from '@plugins/authPlugin';

import BaseRoute from '@routes/baseRoute';

class AuthRoute extends BaseRoute {
  private app: Elysia;
  private controller: AuthController;
  constructor(name: string, dbClient: PrismaClient, config: Config) {
    super(name, dbClient, config);
    this.app = new Elysia({ name, prefix: `/${name.toLowerCase()}` as '' });
    this.controller = new AuthController(config, this.dbClient);
  }

  public configureRoutes(): Elysia {
    this.app
      .use(jwtAccessPlugin(this.config))
      .use(jwtRefreshPlugin(this.config))
      .post('/generate-access-token', this.controller.generateAccessToken, {
        headers: t.Object({
          refresh_token: t.TemplateLiteral('Bearer ${string}'),
        }),
        ...POSTGenerateAccessToken,
      })
      .post(
        '/generate-refresh-token',
        async () => 'generate',
        POSTGenerateRefreshToken
      );
    return this.app;
  }
}

export default AuthRoute;

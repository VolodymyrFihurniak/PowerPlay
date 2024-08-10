import { PrismaClient } from '@prisma/client';
import { Elysia, t } from 'elysia';

import { AuthController } from '@controllers/authController';

import {
  GETActivate,
  POSTForgotPassword,
  POSTLogin,
  POSTLogout,
  POSTRefresh,
  POSTRegister,
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
      .post('/register', this.controller.register, {
        body: t.Object({
          firstName: t.String(),
          secondName: t.String(),
          nickname: t.String(),
          email: t.TemplateLiteral(`\${string}@\${string}.\${string}`),
          password: t.String(),
        }),
        ...POSTRegister,
      })
      .post('/login', () => 'login', POSTLogin)
      .post('/logout', () => 'logout', POSTLogout)
      .post('/forgot-password', () => 'forgot-password', POSTForgotPassword)
      .post('/refresh', () => 'refresh', POSTRefresh)
      .get('/activate/:link', this.controller.activate, {
        params: t.Object({ link: t.String() }),
        ...GETActivate,
      });
    return this.app;
  }
}

export default AuthRoute;

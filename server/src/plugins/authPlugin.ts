import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import { Config } from '@entities/config';

const authAccessPlugin = (config: Config) => (app: Elysia) => {
  return app.use(
    new Elysia({ name: 'auth-access-plugin' }).use(
      jwt({ name: 'jwtAccess', secret: config.authAccessSecret, exp: '15m' })
    )
  );
};

const authRefreshPlugin = (config: Config) => (app: Elysia) => {
  return app.use(
    new Elysia({ name: 'auth-refresh-plugin' }).use(
      jwt({ name: 'jwtRefresh', secret: config.authRefreshSecret, exp: '7d' })
    )
  );
};

export { authAccessPlugin, authRefreshPlugin };

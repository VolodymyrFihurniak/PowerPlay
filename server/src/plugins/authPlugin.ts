import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import { Config } from '@entities/config';

const jwtAccessPlugin = (config: Config) =>
  new Elysia({ name: 'auth-jwt-access-plugin' }).use(
    jwt({
      name: 'jwtAccess',
      secret: config.authAccessSecret,
      exp: config.authAccessExp,
    })
  );

const jwtRefreshPlugin = (config: Config) =>
  new Elysia({ name: 'auth-jwt-refresh-plugin' }).use(
    jwt({
      name: 'jwtRefresh',
      secret: config.authRefreshSecret,
      exp: config.authRefreshExp,
    })
  );

export { jwtAccessPlugin, jwtRefreshPlugin };

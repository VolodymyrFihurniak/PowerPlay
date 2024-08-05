import { cors } from '@elysiajs/cors';
import { APIRoute, AuthRoute, BaseRoute } from '@routes';
import { Elysia } from 'elysia';

import { Config } from '@entities/config';

import { unmatchedRoute } from '@errors/unmatchedRoute';

import { loggingRoutePlugin } from '@plugins/loggingRoutePlugin';
import { swaggerPlugin } from '@plugins/swaggerPlugin';

import { serverLogger } from '@utils/logger';

class App {
  private config!: Config;
  readonly routes: Array<BaseRoute> = [];
  constructor(readonly elysia: Elysia) {}

  public getRoutes(): Array<BaseRoute> {
    return this.routes;
  }

  public getConfig(env: Record<string, string | undefined>): Config {
    return new Config(env);
  }

  public injectPlugin = (): void => {
    this.elysia.use(loggingRoutePlugin(serverLogger));
    this.elysia.use(cors());
    this.elysia.use(swaggerPlugin);
    this.elysia.use(unmatchedRoute);
  };

  public init = (): void => {
    this.config = this.getConfig(process.env);
    this.injectPlugin();
    this.routes.push(new APIRoute('API', this.config));
    this.routes.push(new AuthRoute('API/Auth', this.config));
  };

  public start = async (): Promise<void> => {
    this.init();
    this.routes.forEach((route) => {
      serverLogger.info(`Configuring route: ${route.getName()}`);
      this.elysia.use(route.configureRoutes());
    });
    this.elysia.listen({
      port: this.config.appPort,
      hostname: this.config.appBind,
      serverName: 'PowerPlay-HTTPS',
      tls: {
        key: Bun.file(this.config.appPathTLSKey),
        cert: Bun.file(this.config.appPathTLSPem),
      },
    });
    serverLogger.info(
      'HTTPS Server is running at ' +
        `https://${this.elysia.server?.hostname}:${this.elysia.server?.port}`
    );
  };
}

export { App };

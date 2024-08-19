import { cors } from '@elysiajs/cors';
import { PrismaClient } from '@prisma/client';
import { APIRoute, AuthRoute, type BaseRoute } from '@routes';
import type { Elysia } from 'elysia';

import { Config } from '@entities/config';

import { unmatchedRoute } from '@errors/unmatchedRoute';

import { errorMiddleware } from '@middlewares/errorMiddleware';

import { loggingRoutePlugin } from '@plugins/loggingRoutePlugin';
import { swaggerPlugin } from '@plugins/swaggerPlugin';

import { serverLogger } from '@utils/logger';

class App {
  private config!: Config;
  private dbClient!: PrismaClient;
  readonly routes: Array<BaseRoute> = [];
  constructor(readonly elysia: Elysia) {}

  public getRoutes(): Array<BaseRoute> {
    return this.routes;
  }

  public getConfig(env: Record<string, string | undefined>): Config {
    return new Config(env);
  }

  public injectPlugin = (config: Config): void => {
    this.elysia.use(loggingRoutePlugin(serverLogger));
    this.elysia.use(
      cors({
        credentials: true,
        origin: config.clientURL,
      })
    );
    this.elysia.use(swaggerPlugin);
    this.elysia.use(unmatchedRoute);
    this.elysia.use(errorMiddleware);
  };

  public init = (): void => {
    this.config = this.getConfig(process.env);
    this.dbClient = new PrismaClient();
    this.injectPlugin(this.config);
    this.routes.push(new APIRoute('API', this.dbClient, this.config));
    this.routes.push(new AuthRoute('API/Auth', this.dbClient, this.config));
  };

  public start = async (): Promise<void> => {
    try {
      this.init();
      for (const route of this.routes) {
        serverLogger.info(`Configuring route: ${route.getName()}`);
        this.elysia.use(route.configureRoutes());
      }
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
        `HTTPS Server is running at https://${this.elysia.server?.hostname}:${this.elysia.server?.port}`
      );
    } catch (error) {
      serverLogger.error(error);
    }
  };
}

export { App };

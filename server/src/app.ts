import { cors } from '@elysiajs/cors';
import { ElysiaSwaggerConfig, swagger } from '@elysiajs/swagger';
import Config from '@entities/config';
import { unmatchedRoute } from '@errors/unmatchedRoute';
import { APIRoute, BaseRoute } from '@routes';
import { serverLogger } from '@utils/logger';
import { Elysia } from 'elysia';

import { loggingRoutePlugin } from '@src/plugins/loggingRoutePlugin';

class App {
  private config!: Config;
  readonly routes: Array<BaseRoute> = [];
  constructor(readonly elysia: Elysia) {}

  public getApp(): Elysia {
    return this.elysia;
  }

  public getRoutes(): Array<BaseRoute> {
    return this.routes;
  }

  public getConfig(env: Record<string, string | undefined>): Config {
    return new Config(env);
  }

  public injectPlugin = (): void => {
    this.elysia.use(loggingRoutePlugin(serverLogger));
    this.elysia.use(cors());

    const swaggerOptions: ElysiaSwaggerConfig<'/api-docs'> = {
      documentation: {
        info: {
          title: 'Elysia Documentation',
          version: '1.0.0',
        },
        tags: [
          { name: 'API', description: 'General endpoints' },
          { name: 'Auth', description: 'Authentication endpoints' },
        ],
      },
      path: '/api-docs',
    };
    this.elysia.use(swagger(swaggerOptions));
    this.elysia.use(unmatchedRoute);
  };

  public init = async (): Promise<void> => {
    this.injectPlugin();
    this.routes.push(new APIRoute('API'));
    this.config = this.getConfig(process.env);
  };

  public start = async (): Promise<void> => {
    await this.init();
    this.routes.forEach((route) => {
      serverLogger.info(`Configuring route: ${route.getName()}`);
      this.elysia.use(route.configureRoutes());
    });
    this.elysia.listen({
      port: this.config.appPort,
      hostname: this.config.appBind,
    });
    serverLogger.info(`Server is running at http://${this.elysia.server?.hostname}:${this.elysia.server?.port}`);
  };
}

export { App };

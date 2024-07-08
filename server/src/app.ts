import Config from '@entities/config';
import { ApiRoute, BaseRoute } from '@routes';
import { serverLogger } from '@utils/logger';
import { Elysia } from 'elysia';

import { loggingRoutePlugin } from '@src/plugins/loggingRoutePlugin';

class App {
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
  };

  public init = async (): Promise<void> => {
    this.injectPlugin();
    this.routes.push(new ApiRoute(this.elysia, 'api'));
  };

  public start = async (): Promise<void> => {
    await this.init();
    const config = this.getConfig(process.env);
    this.routes.forEach((route) => {
      this.elysia.use(route.configureRoutes());
    });
    this.elysia.listen({
      port: config.appPort,
      hostname: config.appBind,
    });
    serverLogger.info(`Server is running at http://${this.elysia.server?.hostname}:${this.elysia.server?.port}`);
  };
}
const app = new App(new Elysia());
await app.start();

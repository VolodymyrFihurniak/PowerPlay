import { Elysia, PreContext } from 'elysia';
import { Logger } from 'log4js';

export const loggingRoutePlugin =
  (logger: Logger) =>
  (app: Elysia): Elysia => {
    return app.use(
      new Elysia({ name: 'logging-route-plugin' }).onRequest((ctx: PreContext) => {
        const socketAddress = app.server?.requestIP(ctx.request);

        const { method, url } = ctx.request ?? {};
        if (method && url) {
          logger.info(
            `Request: ${method} ${url} from ${socketAddress?.address}:${socketAddress?.port}`
          );
        } else {
          logger.warn('Request method or URL is undefined');
        }
      })
    );
  };

import { Elysia } from 'elysia';

const unmatchedRoute = (app: Elysia): Elysia => {
  return app.use(
    new Elysia({ name: 'unmatched-route' }).onError(({ code }) => {
      if (code === 'NOT_FOUND') {
        return JSON.stringify({ message: 'This path does not exist' });
      }
    })
  );
};

export { unmatchedRoute };

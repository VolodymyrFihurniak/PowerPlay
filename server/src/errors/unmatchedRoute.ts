import { Elysia } from 'elysia';

const unmatchedRoute = (app: Elysia): Elysia => {
  return app.onError(({ code }) => {
    if (code === 'NOT_FOUND') {
      return JSON.stringify({ message: 'This path does not exist' });
    }
  });
};

export { unmatchedRoute };

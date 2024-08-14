import { Elysia } from 'elysia';

import { ApiError } from '@errors/apiError';

const errorMiddleware = (app: Elysia) => {
  return app.onError(({ error }) => {
    if (error instanceof ApiError) {
      return {
        status: error.status,
        message: error.message,
        errors: error.errors,
      };
    }

    return {
      status: 500,
      message: 'Internal Server Error',
      errors: {},
    };
  });
};

export { errorMiddleware };

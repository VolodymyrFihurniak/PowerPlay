import { JWTOption, jwt } from '@elysiajs/jwt';
import { Context, CookieOptions } from 'elysia';

interface Params {
  name: string;
}
interface Auth {
  set: (options: CookieOptions) => void;
}

interface CustomContext extends Context {
  jwt: JWTOption;
  cookie: {
    auth: Auth;
  };
  params: Params;
}

const authMiddleware = async ({ jwt, cookie: { auth }, params }: CustomContext) => {};

export { authMiddleware };

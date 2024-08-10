import { JWTOption, JWTPayloadSpec } from '@elysiajs/jwt';
import { Context } from 'elysia';

interface AuthContext extends Context {
  jwtAccess?: CustomJWT;
  jwtRefresh?: CustomJWT;
}

interface CustomJWT extends JWTOption {
  readonly sign: (
    morePayload: Record<string, string | number> & JWTPayloadSpec
  ) => Promise<string>;
  readonly verify: (
    jwt?: string
  ) => Promise<false | (Record<string, string | number> & JWTPayloadSpec)>;
}

abstract class AuthRepository {
  abstract activate: (link: string) => Promise<void>;
}

export { AuthRepository, AuthContext, CustomJWT };

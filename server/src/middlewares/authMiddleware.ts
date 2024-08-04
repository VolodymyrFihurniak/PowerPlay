import { AuthContext } from '@src/interfaces/authRepository';

const authMiddleware = async ({ jwtAccess, headers, set }: AuthContext) => {
  const { authorization } = headers;
  const token = authorization?.split(' ')[1];
  if (!token) {
    set.status = 401;
    return JSON.stringify({
      message: 'Unauthorized',
    });
  }
  const result = await jwtAccess!.verify(token);
  if (!result) {
    set.status = 401;
    return JSON.stringify({
      message: 'Unauthorized',
    });
  }
  //   body.user = result;
};

export { authMiddleware };

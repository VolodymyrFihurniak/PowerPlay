import { ApiError } from '@errors/apiError';

import { AuthContext } from '@interfaces/authRepository';

const authMiddleware = async ({
  jwtAccess,
  headers,
  set,
}: AuthContext): Promise<void | Record<string, string | number>> => {
  try {
    const { authorization } = headers;
    const token = authorization?.split(' ')[1];
    if (!token) {
      set.status = 401;
      throw ApiError.Unauthorized();
    }
    const result = await jwtAccess!.verify(token);
    if (!result) {
      set.status = 401;
      throw ApiError.Unauthorized();
    }
    console.log(result);
    return {
      userId: result.userId,
      role: result.role,
    };
  } catch {
    set.status = 500;
    throw ApiError.BadRequest('Invalid token');
  }
};

export { authMiddleware };

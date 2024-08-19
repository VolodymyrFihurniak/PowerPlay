abstract class TokenRepository {
  abstract saveToken(userId: number, token: string): Promise<void>;
  abstract removeToken(token: string): Promise<void>;
  abstract getRefreshTokenId(token: string): Promise<number | null>;
}

export { TokenRepository };

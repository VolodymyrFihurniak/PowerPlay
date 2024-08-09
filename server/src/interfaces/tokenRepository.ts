abstract class TokenRepository {
  abstract saveToken(userId: number, token: string): Promise<void>;
}

export { TokenRepository };

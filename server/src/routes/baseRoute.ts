import { PrismaClient } from '@prisma/client';
import { Elysia } from 'elysia';

import { Config } from '@entities/config';

abstract class BaseRoute {
  constructor(
    readonly name: string,
    readonly dbClient: PrismaClient,
    readonly config: Config
  ) {}
  public getName(): string {
    return this.name;
  }
  abstract configureRoutes(): Elysia;
}

export default BaseRoute;

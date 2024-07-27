import { Elysia } from 'elysia';

import { Config } from '@entities/config';

abstract class BaseRoute {
  constructor(
    readonly name: string,
    readonly config: Config
  ) {}
  public getName(): string {
    return this.name;
  }
  abstract configureRoutes(): Elysia;
}

export default BaseRoute;

import { Elysia } from 'elysia';

abstract class BaseRoute {
  constructor(
    readonly elysia: Elysia,
    readonly name: string
  ) {}
  public getName(): string {
    return this.name;
  }
  abstract configureRoutes(): Elysia;
}

export default BaseRoute;

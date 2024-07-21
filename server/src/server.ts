import { Elysia } from 'elysia';

import { App } from '@src/app';

const app = new App(new Elysia());
await app.start();

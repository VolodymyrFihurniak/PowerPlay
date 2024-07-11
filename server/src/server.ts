import { App } from './app';
import { Elysia } from 'elysia';

const app = new App(new Elysia());
await app.start();

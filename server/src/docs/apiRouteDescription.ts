import { Context, t } from 'elysia';

const TAGS_GROUP = ['API'];

const GETAPIVersionDescription = {
  headers: t.Object({
    authorization: t.TemplateLiteral('Bearer ${string}'),
  }),
  beforeHandle: async ({ redirect }: Context) => redirect('../auth/verify'),
  detail: {
    tags: TAGS_GROUP,
    description: 'Get the version of the API',
    summary: 'Get API version',
    responses: { 200: { description: 'API version' }, 500: { description: 'Internal server error' } },
  },
};

export { GETAPIVersionDescription };

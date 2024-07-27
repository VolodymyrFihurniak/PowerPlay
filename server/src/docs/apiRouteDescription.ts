const TAGS_GROUP = ['API'];

const GETAPIVersionDescription = {
  detail: {
    tags: TAGS_GROUP,
    description: 'Get the version of the API',
    summary: 'Get API version',
    responses: { 200: { description: 'API version' }, 500: { description: 'Internal server error' } },
  },
};

export { GETAPIVersionDescription };

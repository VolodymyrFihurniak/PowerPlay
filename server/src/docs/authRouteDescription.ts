const TAGS_GROUP = ['Auth'];

const GETAUTHVerify = {
  detail: {
    tags: TAGS_GROUP,
    description: 'Get verified using a JWT token',
    summary: 'Get auth verefied',
    responses: { 200: { description: 'User information' }, 500: { description: 'Internal server error' } },
  },
};

export { GETAUTHVerify };

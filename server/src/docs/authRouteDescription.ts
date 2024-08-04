const TAGS_GROUP = ['API/Auth'];

const POSTGenerateAccessToken = {
  detail: {
    tags: TAGS_GROUP,
    description: 'Generate access token',
    summary: 'Generate access token',
    responses: {
      200: { description: 'Access token' },
      500: { description: 'Internal server error' },
    },
  },
};

const POSTGenerateRefreshToken = {
  detail: {
    tags: TAGS_GROUP,
    description: 'Generate refresh token',
    summary: 'Generate refresh token',
    responses: {
      200: { description: 'Refresh token' },
      500: { description: 'Internal server error' },
    },
  },
};

export { POSTGenerateAccessToken, POSTGenerateRefreshToken };

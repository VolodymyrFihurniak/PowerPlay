const TAG_GROUP = ['API/Auth'];

const POSTRegister = {
  detail: {
    tags: TAG_GROUP,
    description: 'Register',
    summary: 'Register',
    responses: {
      200: { description: 'Register' },
      500: { description: 'Internal server error' },
    },
  },
};

const POSTLogin = {
  detail: {
    tags: TAG_GROUP,
    description: 'Login',
    summary: 'Login',
    responses: {
      200: { description: 'Login' },
      500: { description: 'Internal server error' },
    },
  },
};

const POSTLogout = {
  detail: {
    tags: TAG_GROUP,
    description: 'Logout',
    summary: 'Logout',
    responses: {
      200: { description: 'Logout' },
      500: { description: 'Internal server error' },
    },
  },
};

const POSTRefresh = {
  detail: {
    tags: TAG_GROUP,
    description: 'Refresh',
    summary: 'Refresh',
    responses: {
      200: { description: 'Refresh' },
      500: { description: 'Internal server error' },
    },
  },
};

const POSTActivate = {
  detail: {
    tags: TAG_GROUP,
    description: 'Activate',
    summary: 'Activate',
    responses: {
      200: { description: 'Activate' },
      500: { description: 'Internal server error' },
    },
  },
};

const POSTForgotPassword = {
  detail: {
    tags: TAG_GROUP,
    description: 'Forgot password',
    summary: 'Forgot password',
    responses: {
      200: { description: 'Forgot password' },
      500: { description: 'Internal server error' },
    },
  },
};

export {
  POSTRegister,
  POSTLogin,
  POSTLogout,
  POSTRefresh,
  POSTActivate,
  POSTForgotPassword,
};

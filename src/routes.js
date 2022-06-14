const host = '';
const prefix = 'api/v1';

export default {
  dataPath: () => [host, prefix, 'data'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  logoutPath: () => [host, 'logout'].join('/'),
  signupPagePath: () => [host, 'signup'].join('/'),
  loginPagePath: () => [host, 'login'].join('/'),
  chatPagePath: () => [host, ''].join('/'),
};

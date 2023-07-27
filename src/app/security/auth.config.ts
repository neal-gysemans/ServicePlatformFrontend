export const jwtConfig = {
  tokenGetter: () => localStorage.getItem('access_token'),
  allowedDomains: ['http://localhost:9090/api'], // Replace with your backend domain
  disallowedRoutes: []
};

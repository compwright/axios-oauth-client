declare function authorizationCode(axios: any, url: any, client_id: any, client_secret: any, redirect_uri: any, code?: any, scope?: any): (code?: any, scope?: any) => any;

declare function clientCredentials(axios: any, url: any, client_id: any, client_secret: any, scope?: any): (scope: any) => any;

declare function ownerCredentials(axios: any, url: any, client_id: any, client_secret: any, username?: any, password?: any, scope?: any): (username?: any, password?: any, scope?: any) => any;

declare function refreshToken(axios: any, url: any, client_id: any, client_secret: any, refresh_token?: any, scope?: any): (refresh_token?: any, scope?: any) => any;

export { authorizationCode, clientCredentials, ownerCredentials, refreshToken };

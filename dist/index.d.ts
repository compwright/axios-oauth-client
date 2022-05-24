export const client: (axios: any, { url, ...credentials }: {
    [x: string]: any;
    url: any;
}) => () => any;
export const interceptor: (tokenProvider: any, authenticate: any) => any;

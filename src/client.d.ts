import { AxiosRequestConfig, AxiosInstance } from 'axios';

/**
 * [Client Authentication](https://datatracker.ietf.org/doc/html/rfc6749#section-2.3) using [Client Password](https://datatracker.ietf.org/doc/html/rfc6749#section-2.3.1). 
 */
export interface OAuth2ClientAuthenticationPassword {
    /**
     * The client identifier issued to the client during the registration process described by [RFC6749 Section 2.2](https://datatracker.ietf.org/doc/html/rfc6749#section-2.2).
     */
    client_id: string;
    /**
     * The client secret. The client MAY omit the parameter if the client secret is an empty string.
     */
    client_secret: string;
}

/**
 * [Authorization Code Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1) Access Token Request as described in [RFC6749 Section 4.1.3](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3).
 */
export interface OAuth2CodeGrantTokenRequest {
    grant_type: 'authorization_code';
    /**
     * The authorization code received from the authorization server.
     */
    code: string;
    /**
     * REQUIRED, if the "redirect_uri" parameter was included in the authorization request as described in [Section 4.1.1](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1), and their values MUST be identical.
     */
    redirect_uri?: string;
}

/**
 * [Resource Owner Password Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3) Access Token Request as described in [RFC6749 Section 4.3.2](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3.2).
 */
export interface OAuth2OwnerCredentialsGrantTokenRequest {
    grant_type: 'password';
    /**
     * The resource owner username.
     */
    username: string;
    /**
     * The resource owner password.
     */
    password: string;
    /**
     * The scope of the access request as described by [RFC6749 Section 3.3](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3).
     */
    scope?: string;
}

/**
 * [Client Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) Access Token Request as described in [RFC6749 Section 4.4.2](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.2).
 */
export interface OAuth2ClientCredentialsGrantTokenRequest extends OAuth2ClientAuthenticationPassword {
    grant_type: 'client_credentials';
    /**
     * The scope of the access request as described by [RFC6749 Section 3.3](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3).
     */
    scope?: string;
}

/**
 * Access Token Request using Refresh Token as described in [RFC6749 Section 6](https://datatracker.ietf.org/doc/html/rfc6749#section-6).
 */
export interface OAuth2RefreshTokenRequest {
    grant_type: 'refresh_token';
    /**
     * The refresh token issued to the client.
     */
    refresh_token: string;
    /**
     * The scope of the access request as described by [RFC6749 Section 3.3](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3).
     * The requested scope MUST NOT include any scope not originally granted by the resource owner, and if omitted is treated as equal to the scope originally granted by the resource owner.
     */
     scope?: string;
}

/**
 * Access Token Response as decribed in [RFC6749 Section 5.1](https://datatracker.ietf.org/doc/html/rfc6749#section-5.1).
 */
export interface OAuth2TokenResponse {
    /**
     * The access token string as issued by the authorization server.
     */
    access_token: string,
    /**
     * The type of the token issued as described in [RFC6749 Section 7.1](https://datatracker.ietf.org/doc/html/rfc6749#section-7.1).
     * Value is case insensitive.
     */
    token_type: string,
    /**
     * The lifetime in seconds of the access token.  For
     * example, the value "3600" denotes that the access token will
     * expire in one hour from the time the response was generated.
     * If omitted, the authorization server SHOULD provide the
     * expiration time via other means or document the default value.
     */
    expires_in?: number,
    /**
     * The refresh token, which can be used to obtain new access tokens using the same authorization grant as described in [RFC6749 Section 6](https://datatracker.ietf.org/doc/html/rfc6749#section-6).
     */
    refresh_token?: string;
    /**
     * OPTIONAL If identical to the scope requested by the client; otherwise, REQUIRED.
     * The scope of the access token as described by [RFC6749 Section 3.3](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3).
     */
    scope?: string;
}

export interface ClientFactoryOptions {
    /**
     * OAuth2 Token endpoint URL.
     */
    url: string;
}

export type ClientFactoryOptionsWithTokenRequest = ClientFactoryOptions&(OAuth2ClientAuthenticationPassword|{})&(OAuth2CodeGrantTokenRequest|OAuth2OwnerCredentialsGrantTokenRequest|OAuth2ClientCredentialsGrantTokenRequest|OAuth2RefreshTokenRequest);

declare function ClientFactory(axios: (config?:AxiosRequestConfig) => AxiosInstance, options: ClientFactoryOptionsWithTokenRequest): (() => Promise<OAuth2TokenResponse>);
export = ClientFactory;

# axios-oauth-client

[![Build Status](https://travis-ci.org/compwright/axios-oauth-client.svg?branch=master)](https://travis-ci.org/compwright/axios-oauth-client) [![Greenkeeper badge](https://badges.greenkeeper.io/compwright/axios-oauth-client.svg)](https://greenkeeper.io/)

OAuth 2.0 client utils for axios

## Installation

```bash
$ npm install --save axios-oauth-client axios-token-interceptor axios
```

## Axios OAuth 2.0 Client

### Authorization Code grant

```javascript
const axios = require('axios');
const oauth = require('axios-oauth-client');
const getAuthorizationCode = oauth.client(axios.create(), {
  url: 'https://oauth.com/2.0/token',
  grant_type: 'authorization_code',
  client_id: 'foo',
  client_secret: 'bar',
  redirect_uri: '...',
  code: '...',
  scope: 'baz',
});

const auth = await getAuthorizationCode(); // => { "access_token": "...", "expires_in": 900, ... }
```

### Owner Credentials grant

```javascript
const axios = require('axios');
const oauth = require('axios-oauth-client');
const getOwnerCredentials = oauth.client(axios.create(), {
  url: 'https://oauth.com/2.0/token',
  grant_type: 'password',
  client_id: 'foo',
  client_secret: 'bar',
  username: 'asdf',
  password: 'yuio',
  scope: 'baz'
});

const auth = await getOwnerCredentials(); // => { "access_token": "...", "expires_in": 900, ... }
```

### Client Credentials grant

```javascript
const axios = require('axios');
const oauth = require('axios-oauth-client');
const getClientCredentials = oauth.client(axios.create(), {
  url: 'https://oauth.com/2.0/token',
  grant_type: 'client_credentials',
  client_id: 'foo',
  client_secret: 'bar',
  scope: 'baz'
});

const auth = await getClientCredentials(); // => { "access_token": "...", "expires_in": 900, ... }
```

### Refresh Token grant

```javascript
const axios = require('axios');
const oauth = require('axios-oauth-client');
const getRefreshToken = oauth.client(axios.create(), {
  url: 'https://oauth.com/2.0/token',
  grant_type: 'refresh_token',
  client_id: 'foo',
  client_secret: 'bar',
  refresh_token: '...',
  scope: 'baz'
});

const auth = await getRefreshToken(); // => { "access_token": "...", "refresh_token": "...", "expires_in": 900, ... }
```

## Axios OAuth 2.0 Authentication interceptor

```javascript
const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');

const getOwnerCredentials = oauth.client(axios.create(), {
  // see example above
})

const instance = axios.create();
instance.interceptors.request.use(
  // Wraps axios-token-interceptor with oauth-specific configuration,
  // fetches the token using the desired claim method, and caches
  // until the token expires
  oauth.interceptor(tokenProvider, getOwnerCredentials)
);
```

## License

MIT

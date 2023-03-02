# axios-oauth-client

[![Build Status](https://app.travis-ci.com/compwright/axios-oauth-client.svg?branch=master)](https://app.travis-ci.com/github/compwright/axios-oauth-client)

OAuth 2.0 client utils for axios

## Installation

With NPM:

```bash
$ npm install --save axios-oauth-client axios
```

With Yarn:

```bash
$ yarn add axios-oauth-client axios
```

## Axios OAuth 2.0 Client

### Authorization Code grant

```javascript
import axios from 'axios'
import oauth from 'axios-oauth-client'
const getAuthorizationCode = oauth.authorizationCode(
  axios.create(),
  'https://oauth.com/2.0/token', // OAuth 2.0 token endpoint
  'CLIENT_ID',
  'CLIENT_SECRET',
  'https://your-app.com/oauth-redirect' // Redirect URL for your app
)

const auth = await getAuthorizationCode('AUTHORIZATION_CODE', 'OPTIONAL_SCOPES')
// => { "access_token": "...", "expires_in": 900, ... }
```

### Owner Credentials grant

```javascript
import axios from 'axios'
import oauth from 'axios-oauth-client'
const getOwnerCredentials = oauth.ownerCredentials(
  axios.create(),
  'https://oauth.com/2.0/token', // OAuth 2.0 token endpoint
  'CLIENT_ID',
  'CLIENT_SECRET'
)

const auth = await getOwnerCredentials('USERNAME', 'PASSWORD', 'OPTIONAL_SCOPES')
// => { "access_token": "...", "expires_in": 900, ... }
```

### Client Credentials grant

```javascript
import axios from 'axios'
import oauth from 'axios-oauth-client'
const getClientCredentials = oauth.clientCredentials(
  axios.create(),
  'https://oauth.com/2.0/token',
  'CLIENT_ID',
  'CLIENT_SECRET'
)

const auth = await getClientCredentials('OPTIONAL_SCOPES')
// => { "access_token": "...", "expires_in": 900, ... }
```

### Refresh Token grant

```javascript
import axios from 'axios'
import oauth from 'axios-oauth-client'
const getRefreshToken = oauth.refreshToken(
  axios.create(),
  'https://oauth.com/2.0/token',
  'CLIENT_ID',
  'CLIENT_SECRET'
)

const auth = await getRefreshToken('REFRESH_TOKEN', 'OPTIONAL_SCOPES')
// => { "access_token": "...", "refresh_token": "...", "expires_in": 900, ... }
```

## License

MIT

'use strict';

const qs = require('qs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);

function oauth(axios, { url, ...credentials }) {
  const config = {
    url,
    method: "post",
    data: qs__default.stringify(credentials)
  };
  return () => axios(config).then((res) => res.data);
}
oauth.authorizationCode = function(axios, url, client_id, client_secret, redirect_uri, code, scope = null) {
  return oauth(axios, {
    url,
    grant_type: "authorization_code",
    client_id,
    client_secret,
    redirect_uri,
    code,
    scope
  });
};
oauth.ownerCredentials = function(axios, url, client_id, client_secret, username, password, scope = null) {
  return oauth(axios, {
    url,
    grant_type: "password",
    client_id,
    client_secret,
    username,
    password,
    scope
  });
};
oauth.clientCredentials = function(axios, url, client_id, client_secret, scope = null) {
  return oauth(axios, {
    url,
    grant_type: "client_credentials",
    client_id,
    client_secret,
    scope
  });
};
oauth.refreshToken = function(axios, url, client_id, client_secret, refresh_token, scope = null) {
  return oauth(axios, {
    url,
    grant_type: "refresh_token",
    client_id,
    client_secret,
    refresh_token,
    scope
  });
};

module.exports = oauth;

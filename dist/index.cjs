'use strict';

const require$$0 = require('qs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

const qs = require$$0__default;
var client = function(axios, { url, ...credentials }) {
  const config = {
    url,
    method: "post",
    data: qs.stringify(credentials)
  };
  return () => axios(config).then((res) => res.data);
};

function getMaxAge(res) {
  return res.expires_in * 1e3;
}
function headerFormatter(res) {
  return "Bearer " + res.access_token;
}
var interceptor = function(tokenProvider, authenticate) {
  const getToken = tokenProvider.tokenCache(authenticate, { getMaxAge });
  return tokenProvider({ getToken, headerFormatter });
};

var src = {
  client: client,
  interceptor: interceptor
};

module.exports = src;

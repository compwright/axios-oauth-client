'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const qs = require('qs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);

function client(axios, { url, ...credentials }) {
  const config = {
    url,
    method: "post",
    data: qs__default.stringify(credentials)
  };
  return () => axios(config).then((res) => res.data);
}

function getMaxAge(res) {
  return res.expires_in * 1e3;
}
function headerFormatter(res) {
  return "Bearer " + res.access_token;
}
function interceptor(tokenProvider, authenticate) {
  const getToken = tokenProvider.tokenCache(authenticate, { getMaxAge });
  return tokenProvider({ getToken, headerFormatter });
}

exports.client = client;
exports.interceptor = interceptor;

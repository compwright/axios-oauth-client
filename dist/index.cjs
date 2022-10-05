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

module.exports = oauth;

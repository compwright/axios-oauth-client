"use strict";

function getMaxAge(res) {
  return res.expires_in;
}

function headerFormatter(res) {
  return 'Bearer ' + res.access_token;
}

module.exports = function (tokenProvider, authenticate) {
  var getToken = tokenProvider.tokenCache(authenticate, {
    getMaxAge: getMaxAge
  });
  return tokenProvider({
    getToken: getToken,
    headerFormatter: headerFormatter
  });
};
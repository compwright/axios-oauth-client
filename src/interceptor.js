function getMaxAge (res) {
  return res.expires_in;
}

function headerFormatter (res) {
  return 'Bearer ' + res.access_token;
}

module.exports = function (tokenProvider, authenticate) {
  const getToken = tokenProvider.tokenCache(authenticate, { getMaxAge });
  return tokenProvider({ getToken, headerFormatter });
};

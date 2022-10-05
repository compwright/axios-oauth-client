import require$$0 from 'qs';

const qs = require$$0;
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

export { src as default };

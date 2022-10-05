import qs from 'qs';

function client(axios, { url, ...credentials }) {
  const config = {
    url,
    method: "post",
    data: qs.stringify(credentials)
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

export { client, interceptor };

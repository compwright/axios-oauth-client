function oauth(axios, { url, ...credentials }) {
  return (moreCredentials = {}) => {
    const body = {
      ...credentials,
      ...moreCredentials
    };
    if ("scope" in body && !body.scope) {
      delete body.scope;
    }
    return axios({
      url,
      method: "post",
      data: new URLSearchParams(body).toString()
    }).then((res) => res.data);
  };
}

function authorizationCode(axios, url, client_id, client_secret, redirect_uri, code = null, scope = null) {
  const grant = oauth(axios, {
    url,
    grant_type: "authorization_code",
    client_id,
    client_secret,
    redirect_uri,
    code,
    scope
  });
  return (code2 = null, scope2 = null) => grant({ code: code2, scope: scope2 });
}

function clientCredentials(axios, url, client_id, client_secret, scope = null) {
  const grant = oauth(axios, {
    url,
    grant_type: "client_credentials",
    client_id,
    client_secret,
    scope
  });
  return (scope2) => grant(scope2 ? { scope: scope2 } : null);
}

function ownerCredentials(axios, url, client_id, client_secret, username = null, password = null, scope = null) {
  const grant = oauth(axios, {
    url,
    grant_type: "password",
    client_id,
    client_secret,
    username,
    password,
    scope
  });
  return (username2 = null, password2 = null, scope2 = null) => grant({ username: username2, password: password2, scope: scope2 });
}

function refreshToken(axios, url, client_id, client_secret, refresh_token = null, scope = null) {
  const grant = oauth(axios, {
    url,
    grant_type: "refresh_token",
    client_id,
    client_secret,
    refresh_token,
    scope
  });
  return (refresh_token2 = null, scope2 = null) => grant({ refresh_token: refresh_token2, scope: scope2 });
}

export { authorizationCode, clientCredentials, ownerCredentials, refreshToken };

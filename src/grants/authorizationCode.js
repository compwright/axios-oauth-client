import { oauth } from '../oauth'

/* eslint-disable camelcase */

export function authorizationCode (axios, url, client_id, client_secret, redirect_uri, code = null, scope = null) {
  const grant = oauth(axios, {
    url,
    grant_type: 'authorization_code',
    client_id,
    client_secret,
    redirect_uri,
    code,
    scope
  })

  return (code = null, scope = null) => grant({ code, scope })
}

import { oauth } from '../oauth'

/* eslint-disable camelcase */

export function refreshToken (axios, url, client_id, client_secret, refresh_token = null, scope = null) {
  const grant = oauth(axios, {
    url,
    grant_type: 'refresh_token',
    client_id,
    client_secret,
    refresh_token,
    scope
  })

  return (refresh_token = null, scope = null) => grant({ refresh_token, scope })
}

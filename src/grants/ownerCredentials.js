import oauth from '../oauth'

/* eslint-disable camelcase */

export default function ownerCredentials (axios, url, client_id, client_secret, username = null, password = null, scope = null) {
  const grant = oauth(axios, {
    url,
    grant_type: 'password',
    client_id,
    client_secret,
    username,
    password,
    scope
  })

  return (username = null, password = null, scope = null) => grant({ username, password, scope })
}

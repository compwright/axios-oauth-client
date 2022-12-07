import oauth from '../oauth'

/* eslint-disable camelcase */

export default function clientCredentials (axios, url, client_id, client_secret, scope = null) {
  const grant = oauth(axios, {
    url,
    grant_type: 'client_credentials',
    client_id,
    client_secret,
    scope
  })

  return (scope) => grant(scope ? { scope } : null)
}

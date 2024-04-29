export function oauth (axios, { url, ...credentials }) {
  return (moreCredentials = {}) => {
    const body = {
      ...credentials,
      ...moreCredentials
    }

    // remove blank scope
    if ('scope' in body && !body.scope) {
      delete body.scope
    }

    return axios({
      url,
      method: 'post',
      data: new URLSearchParams(body).toString()
    }).then(res => res.data)
  }
}

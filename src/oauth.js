export function oauth (axios, { url, ...credentials }) {
  return (moreCredentials = {}) => {
    const body = {
      ...credentials,
      ...moreCredentials
    }

    // remove all blank values
    for (const key of Object.keys(body)) {
      if (!body[key]) { delete body[key] }
    }

    return axios({
      url,
      method: 'post',
      data: new URLSearchParams(body).toString()
    }).then(res => res.data)
  }
}

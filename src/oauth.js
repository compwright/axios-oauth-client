import qs from 'qs'

export default function oauth (axios, { url, ...credentials }) {
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
      data: qs.stringify(body)
    }).then(res => res.data)
  }
}

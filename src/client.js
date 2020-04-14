const qs = require('qs');

module.exports = function (axios, { url, ...credentials }) {
  const config = {
    url,
    method: 'post',
    data: qs.stringify(credentials)
  };

  return () => axios(config).then(res => res.data);
};

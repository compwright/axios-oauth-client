const assert = require('assert');
const tokenProvider = require('axios-token-interceptor');
const interceptor = require('../src/interceptor');

describe('interceptor', function () {
  it('should return an axios request interceptor function', function () {
    assert.strictEqual(typeof interceptor(tokenProvider), 'function');
  });

  describe('the axios request interceptor function', function () {
    it('should set the oauth access token in the request authorization header with the bearer scheme', async function () {
      const authenticate = async () => ({
        access_token: 'foo',
        expires_in: 0
      });
      const newRequest = await interceptor(tokenProvider, authenticate)({
        headers: {}
      });
      assert.deepStrictEqual(newRequest, {
        headers: {
          Authorization: 'Bearer foo'
        }
      });
    });

    it('should cache the oauth access token until it expires', async function () {
      function delay (ms) {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
      }

      let calls = 0;
      const authenticate = async () => {
        return {
          access_token: 'foo' + calls++,
          expires_in: 2
        };
      };

      const req = { headers: {} };
      const requestInterceptor = interceptor(tokenProvider, authenticate);

      function test3x (req) {
        return Promise.all([
          requestInterceptor(req),
          requestInterceptor(req),
          requestInterceptor(req)
        ]);
      }

      function verify (results, expected) {
        for (const result of results) {
          assert.deepStrictEqual(result, expected);
        }
      }

      let results = await test3x(req);

      await delay(1000);

      results.push(...await test3x(req));

      verify(results, {
        headers: { Authorization: 'Bearer foo0' }
      });

      await delay(2000);

      results = await test3x(req);
      verify(results, {
        headers: { Authorization: 'Bearer foo1' }
      });
    });
  });
});

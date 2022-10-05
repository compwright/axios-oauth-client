import assert from 'assert'
import qs from 'qs'
import { describe, test } from '@jest/globals'
import oauth from './index'

describe('oauth()', function () {
  test('should return a function', function () {
    assert.strictEqual(typeof oauth(() => {}, {}), 'function')
  })

  describe('the function', function () {
    test('should make an OAuth token request from the supplied parameters', async function () {
      const params = {
        url: 'https://oauth.com/2.0/token',
        grant_type: 'client_credentials',
        client_id: 'foo',
        client_secret: 'bar',
        scope: 'baz'
      }

      const axios = async function (config) {
        const { url, ...data } = params
        assert.deepStrictEqual(config, {
          url,
          method: 'post',
          data: qs.stringify(data)
        })
        return { data: true }
      }

      const auth = oauth(axios, params)
      assert.strictEqual(await auth(), true)
    })

    test('should resolve to the OAuth token response', async function () {
      const data = { access_token: 'FAKE_TOKEN', expires_in: 5 }
      const axios = async () => ({ data })
      const auth = oauth(axios, {})
      assert.deepStrictEqual(await auth(), data)
    })
  })
})

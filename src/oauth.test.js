import assert from 'assert'
import { describe, test } from '@jest/globals'
import oauth from './oauth'
import fakeAxios from './fakeAxios'

/* eslint-disable camelcase */

describe('oauth()', function () {
  test('should return a function', function () {
    assert.strictEqual(typeof oauth(() => {}, {}), 'function')
  })

  describe('the function', function () {
    test('should make an OAuth 2.0 token request from the supplied parameters', async function () {
      const params = {
        url: 'https://oauth.com/2.0/token',
        grant_type: 'client_credentials',
        client_id: 'foo',
        client_secret: 'bar',
        scope: 'baz'
      }

      const actualConfig = {}
      const auth = oauth(fakeAxios(actualConfig), params)
      await auth()

      assert.deepStrictEqual(actualConfig, {
        url: 'https://oauth.com/2.0/token',
        method: 'post',
        data: 'grant_type=client_credentials&client_id=foo&client_secret=bar&scope=baz'
      })
    })

    test('should omit the scope param if not provided', async function () {
      const params = {
        url: 'https://oauth.com/2.0/token',
        grant_type: 'client_credentials',
        client_id: 'foo',
        client_secret: 'bar'
      }

      const actualConfig = {}
      const auth = oauth(fakeAxios(actualConfig), params)
      await auth()

      assert.deepStrictEqual(actualConfig, {
        url: 'https://oauth.com/2.0/token',
        method: 'post',
        data: 'grant_type=client_credentials&client_id=foo&client_secret=bar'
      })
    })

    test('should omit the scope param if null', async function () {
      const params = {
        url: 'https://oauth.com/2.0/token',
        grant_type: 'client_credentials',
        client_id: 'foo',
        client_secret: 'bar',
        scope: null
      }

      const actualConfig = {}
      const auth = oauth(fakeAxios(actualConfig), params)
      await auth()

      assert.deepStrictEqual(actualConfig, {
        url: 'https://oauth.com/2.0/token',
        method: 'post',
        data: 'grant_type=client_credentials&client_id=foo&client_secret=bar'
      })
    })

    test('should resolve to the OAuth token response', async function () {
      const expectedData = { access_token: 'FAKE_TOKEN', expires_in: 5 }
      const auth = oauth(fakeAxios({}, expectedData), {})
      const actualData = await auth()
      assert.deepStrictEqual(actualData, expectedData)
    })
  })
})

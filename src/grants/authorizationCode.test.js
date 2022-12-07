import assert from 'assert'
import { test } from '@jest/globals'
import authorizationCode from './authorizationCode'
import fakeAxios from '../fakeAxios'

/* eslint-disable camelcase */

test('authorizationCode()', async function () {
  const actualConfig = {}

  const getToken = authorizationCode(
    fakeAxios(actualConfig),
    'https://oauth.com/2.0/token',
    'foo',
    'bar',
    'https://my-app.com/redirect'
  )

  await getToken('asdf1234', 'baz')

  assert.deepStrictEqual(actualConfig, {
    url: 'https://oauth.com/2.0/token',
    method: 'post',
    data: 'grant_type=authorization_code&client_id=foo&client_secret=bar&redirect_uri=https%3A%2F%2Fmy-app.com%2Fredirect&code=asdf1234&scope=baz'
  })
})

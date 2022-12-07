import assert from 'assert'
import { test } from '@jest/globals'
import refreshToken from './refreshToken'
import fakeAxios from '../fakeAxios'

/* eslint-disable camelcase */

test('refreshToken()', async function () {
  const actualConfig = {}

  const getToken = refreshToken(
    fakeAxios(actualConfig),
    'https://oauth.com/2.0/token',
    'foo',
    'bar'
  )

  await getToken('asdf1234', 'baz')

  assert.deepStrictEqual(actualConfig, {
    url: 'https://oauth.com/2.0/token',
    method: 'post',
    data: 'grant_type=refresh_token&client_id=foo&client_secret=bar&refresh_token=asdf1234&scope=baz'
  })
})

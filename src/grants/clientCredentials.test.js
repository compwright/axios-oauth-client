import assert from 'assert'
import { test } from '@jest/globals'
import clientCredentials from './clientCredentials'
import fakeAxios from '../fakeAxios'

/* eslint-disable camelcase */

test('clientCredentials()', async function () {
  const actualConfig = {}

  const getToken = clientCredentials(
    fakeAxios(actualConfig),
    'https://oauth.com/2.0/token',
    'foo',
    'bar'
  )

  await getToken('baz')

  assert.deepStrictEqual(actualConfig, {
    url: 'https://oauth.com/2.0/token',
    method: 'post',
    data: 'grant_type=client_credentials&client_id=foo&client_secret=bar&scope=baz'
  })
})

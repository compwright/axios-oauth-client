import assert from 'node:assert'
import { test } from '@jest/globals'
import { ownerCredentials } from './ownerCredentials'
import { fakeAxios } from '../fakeAxios'

/* eslint-disable camelcase */

test('ownerCredentials()', async function () {
  const actualConfig = {}

  const getToken = ownerCredentials(
    fakeAxios(actualConfig),
    'https://oauth.com/2.0/token',
    'foo',
    'bar'
  )

  await getToken('user-name', 'abcd1234', 'baz')

  assert.deepStrictEqual(actualConfig, {
    url: 'https://oauth.com/2.0/token',
    method: 'post',
    data: 'grant_type=password&client_id=foo&client_secret=bar&username=user-name&password=abcd1234&scope=baz'
  })
})

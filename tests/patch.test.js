import nock from 'nock'

import { createClient } from '../src/client'
import { getHTTPMethods } from '../src/http'

const EXAMPLE_URI = 'http://example.com/api/v1/'

describe('PATCH Requests', () => {
  afterAll(() => {
    nock.cleanAll()
  })

  test('Testing a basic PATCH request', async () => {
    nock(EXAMPLE_URI)
      .patch('/')
      .reply(200, { body: 'success' })

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const request = await http.patch()
    const json = await request.json()
    expect(json.body).toEqual('success')
  })

  test('Testing a basic PATCH request with body', async () => {
    nock(EXAMPLE_URI)
      .patch('/')
      .reply(200, (uri, body) => body)

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const params = { a: 1, b: 'casá' }
    const request = await http.patch(null, params)
    const json = await request.json()
    expect(json).toEqual(params)
  })
})

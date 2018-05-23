import nock from 'nock'

import { createClient } from '../src/client'
import { getHTTPMethods } from '../src/http'

const EXAMPLE_URI = 'http://example.com/api/v1/'

describe('PUT Requests', () => {
  afterAll(() => {
    nock.cleanAll()
  })

  test('Testing a basic PUT request', async () => {
    nock(EXAMPLE_URI)
      .put('/')
      .reply(200, { body: 'success' })

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const request = await http.put()
    const json = await request.json()
    expect(json.body).toEqual('success')
  })

  test('Testing a basic PUT request with body', async () => {
    nock(EXAMPLE_URI)
      .put('/')
      .reply(200, (uri, body) => body)

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const params = { a: 1, b: 'casá' }
    const request = await http.put(null, params)
    const json = await request.json()
    expect(json).toEqual(params)
  })
})

import nock from 'nock'

import { createClient } from '../src/client'
import { getHTTPMethods } from '../src/http'

const EXAMPLE_URI = 'http://example.com/api/v1/'

describe('POST Requests', () => {
  afterAll(() => {
    nock.cleanAll()
  })

  test('Testing a basic POST request', async () => {
    nock(EXAMPLE_URI)
      .post('/')
      .reply(200, { body: 'success' })

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const request = await http.post()
    const json = await request.json()
    expect(json.body).toEqual('success')
  })

  test('Testing a basic POST request with body', async () => {
    nock(EXAMPLE_URI)
      .post('/')
      .reply(200, (uri, body) => body)

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const params = { a: 1, b: 'casá' }
    const request = await http.post(null, params)
    const json = await request.json()
    expect(json).toEqual(params)
  })
})

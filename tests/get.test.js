import nock from 'nock'

import { createClient } from '../src/client'
import { getHTTPMethods } from '../src/http'

const EXAMPLE_URI = 'http://example.com/api/v1/'

describe('GET Requests', () => {
  afterAll(() => {
    nock.cleanAll()
  })

  test('get', async () => {
    nock(EXAMPLE_URI)
      .get('/')
      .reply(200, { body: 'success' })

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const request = await http.get()
    const json = await request.json()
    expect(json.body).toEqual('success')
  })
})

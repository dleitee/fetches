import nock from 'nock'

import { createClient } from '../src/client'
import { getHTTPMethods } from '../src/http'

const EXAMPLE_URI = 'http://example.com/api/v1/'

describe('GET Requests', () => {
  afterAll(() => {
    nock.cleanAll()
  })

  test('Testing a basic GET request', async () => {
    nock(EXAMPLE_URI)
      .get('/')
      .reply(200, { body: 'success' })

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const request = await http.get()
    const json = await request.json()
    expect(json.body).toEqual('success')
  })

  test('Testing a basic GET request with params', async () => {
    nock(EXAMPLE_URI)
      .get('/?a=1')
      .reply(200, { body: 'success' })

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const request = await http.get(null, { a: 1 })
    const json = await request.json()
    expect(json.body).toEqual('success')
  })

  test('Testing a basic GET request with multiple params', async () => {
    nock(EXAMPLE_URI)
      .get('/?a=1&b=2')
      .reply(200, { body: 'success' })

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const request = await http.get(null, { a: 1, b: 2 })
    const json = await request.json()
    expect(json.body).toEqual('success')
  })

  test('Testing a basic GET request with array params', async () => {
    nock(EXAMPLE_URI)
      .get('/')
      .query({
        a: 1,
        b: 2,
        c: [1, 2],
      })
      .reply(200, { body: 'success' })

    const client = createClient(EXAMPLE_URI)
    const http = getHTTPMethods(client)
    const request = await http.get(null, { a: 1, b: 2, c: [1, 2] })
    const json = await request.json()
    expect(json.body).toEqual('success')
  })
})

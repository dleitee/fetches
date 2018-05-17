# fetch

Opinionated fetch wrapper for modern front-end.

## Features
 - [ ] Methods (HTTP and Promise)
    - [ ] GET
    - [ ] POST
    - [ ] PATCH
    - [ ] UPDATE
    - [ ] UPLOAD
    - [ ] DELETE as REMOVE,
    - [ ] ALL
    - [ ] RACE
 - [ ] CacheAPI
 - [ ] SSR
 - [ ] Apollo Like
 - [ ] ReactComponentSeam
 - [ ] VanillaJS Library
 - [x] Url Module
 - [ ] Client
 - [ ] FetchProvider

```es6
const client = createClient('http://example.com', {
  fetchOptions: ({ headers, }) => {},
  debug: true,
  onError: () => {},
  cache: ENUM,
})

const http = getHttpMethods(client)

<FetchProvider client={client}>

</FetchProvider>

const url = createUrl(['posts?id=:id'], ({ params }) => params)
const url = createUrl(['posts/:id/all'], ({ params }) => params)

http.get('posts', params)
http.post('posts', params)
```
## Install

```
yarn add @cheesecakelabs/fetch
```

## Initialize

```javascript
import CKLFetch from '@cheesecakelabs/fetch'

const fetch = new CKLFetch('http://your_api.io/api/v1/')

fetch.get('users')
fetch.post('users', options, body)
fetch.patch('users', options, body)
fetch.put('users', options, body)
fetch.delete('users')
fetch.upload('users', options, formData)

fetch.get(['campaigns', 'my-campaign-id'], { key, params })

const data = new FormData()
data.append('file', payload.image)
data.append('upload_preset', UPLOAD_PRESET)
fetch.upload('some-ednpoint', {}, data)
```

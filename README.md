# fetches
[![codecov](https://codecov.io/gh/dleitee/fetches/branch/master/graph/badge.svg?token=U3H6jLNbac)](https://codecov.io/gh/dleitee/fetches) [![CircleCI](https://circleci.com/gh/dleitee/fetches.svg?style=svg&circle-token=f42a433fef54fd17c818742c05907d4232ccb224)](https://circleci.com/gh/dleitee/fetches) [![Greenkeeper badge](https://badges.greenkeeper.io/dleitee/fetches.svg?token=1574e399ea4865ffbdc06a581673c7ae27e783771d794f9a97a6931118cbdab6&ts=1528215914233)](https://greenkeeper.io/)

Fetches is a workaround to make requests, in an easy and scalable way.

With Fetches you can define your main settings (URL, Auth Header, Request Type, etc), in a single place and then make requests using this info.

## Table of Contents

 - [Install](#install)
 - [Example](#example)
 - [API Reference](#api-reference)
   - [Client](#client-instance)
   - [createClient](#function-createclient)
   - [getHTTPMethods](#function-gethttpmethods)
 - [Browser Support](#browser-support)
 - [How to Contribute](#how-to-contribute)
 - [License](#license)


## Install

```sh
npm install --save fetches
```

## Example

Here we will show a simple request to **pokeapi**, getting the first pokemon.

```es6
import { createClient, getHTTPMethods } from 'fetches'

const client = createClient('http://pokeapi.co/api/v2/')

const http = getHTTPMethods(client)

const bulbasaur = await http.get('pokemon/1') 
```

## API Reference

### Client instance

#### Methods

 - **getURI** - returns the URI of client.

### Function createClient

#### Syntax

```es6
(uri, [options]) => Client
```

#### Import

```es6
import { createClient } from 'fetches'
```

#### Parameters

 - **uri** - The URI of your API.
 - **options** - *optional* - An object containing the settings for all requests made by this created client.
   - **request** - *default: {}* - The same custom settings accepted by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Syntax)
   - **uri** - *default: { removeTrailingSlash: false }* - The same setting accepted by [sindresorhus/normalize-url](https://github.com/sindresorhus/normalize-url)


### Function getHTTPMethods

#### Syntax

```es6
(client) => Object
```

#### Import

```es6
import { getHTTPMethods } from 'fetches'
```

#### HTTP Methods

 - **get(uri, [params, [options]])**
   - **uri** - String, Array\<String\> - the complement of your main URI. 
   - **params** - Object - *optional* - URL query params.
   - **options** - Object - *optional* - The same custom settings accepted by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Syntax)
   
   
 - **post(uri, [params, [options]])**
   - **uri** - String, Array\<String\> - the complement of your main URI. 
   - **data** - Object - *optional* - The body of request.
   - **options** - Object - *optional* - The same custom settings accepted by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Syntax)
   
 - **put(uri, [params, [options]])**
   - **uri** - String, Array\<String\> - the complement of your main URI. 
   - **data** - Object - *optional* - The body of request.
   - **options** - Object - *optional* - The same custom settings accepted by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Syntax)

 - **patch(uri, [params, [options]])**
   - **uri** - String, Array\<String\> - the complement of your main URI. 
   - **data** - Object - *optional* - The body of request.
   - **options** - Object - *optional* - The same custom settings accepted by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Syntax)

 - **delete(uri, [params, [options]])**
   - **uri** - String, Array\<String\> - the complement of your main URI. 
   - **data** - Object - *optional* - The body of request.
   - **options** - Object - *optional* - The same custom settings accepted by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Syntax)

## Browser Support

Fetches is based on [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), which the most of modern browsers already are compatible, but if you need to be compatible with an older browser, you may use this [polyfill](https://github.com/github/fetch)

## How to Contribute

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -m 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request :)

## License

MIT License

Copyright (c) 2018 Daniel Leite de Oliveira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



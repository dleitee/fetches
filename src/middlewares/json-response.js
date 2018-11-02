const contentTypeIsJSON = header => header && header.includes('application/json')

export default response => {
  if (contentTypeIsJSON(response.headers.get('content-type'))) {
    return Promise.all(response.json(), response)
  }

  return Promise.resolve(response)
}

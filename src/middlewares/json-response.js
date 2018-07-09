const contentTypeIsJSON = header => header && header.includes('application/json')

export default response => {
  if (contentTypeIsJSON(response.headers.get('content-type'))) {
    return response.json()
  }

  return Promise.resolve(response)
}

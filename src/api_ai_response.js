const createApiAiResponse = (params) => {
  const defaultResponse = {
    speech: 'Yes master Bruce!',
    displayText: 'Yes master Bruce!',
    data: {},
    contextOut: [],
    source: 'Somewhere only we know'
  }
  return Object.assign(defaultResponse, params)
}

export default createApiAiResponse

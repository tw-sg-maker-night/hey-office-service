const createApiAiResponse = (params) => {
  const baseResponse = {
    speech: 'Yes how can I help?',
    displayText: 'Yes how can I help?',
    data: {},
    contextOut: [],
    source: 'Somewhere only we know'
  }
  return Object.assign(baseResponse, params)
}

export default createApiAiResponse

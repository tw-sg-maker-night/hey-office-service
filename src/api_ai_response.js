const createApiAiResponse = (params) => {
  const baseResponse = {
    speech: 'Yes master Bruce!',
    displayText: 'Yes master Bruce!',
    data: {},
    contextOut: [],
    source: 'Somewhere only we know'
  }
  return Object.assign(baseResponse, params)
}

export default createApiAiResponse

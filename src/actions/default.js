import createApiAiResponse from '../api_ai_response'

const defaultHandler = (req, res) => {
  const response = `Yes master Bruce! I don't understand what you mean by ${req.body.result.resolvedQuery}`;
  const defaultResponse = {
    speech: response,
    displayText: response
  }
  res.json(createApiAiResponse(defaultResponse))
}

export default defaultHandler

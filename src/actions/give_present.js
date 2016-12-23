import createApiAiResponse from '../api_ai_response'

const givePresentHandler = (req, res, next) => {
  if (req.body.result.action !== 'give_present') {
    next();
  } else {
    const response = `I'd buy you a ${req.body.result.parameters.item} for Christmas`;
    const givePresentResponse = {
      speech: response,
      displayText: response
    }
    res.json(createApiAiResponse(givePresentResponse));
  }
}

export default givePresentHandler

import { expect } from 'chai'
import createApiAiResponse from '../src/api_ai_response'

describe('createApiAiResponse', () => {
  it('creates base response with required properties', () => {
    const response = createApiAiResponse();
    expect(response).to.have.property('speech').that.is.a('string');
    expect(response).to.have.property('displayText').that.is.a('string');
    expect(response).to.have.property('data').that.is.an('object');
    expect(response).to.have.property('contextOut').that.is.an('array');
    expect(response).to.have.property('source').that.is.a('string');
  });

  it('creates response with modified required properties', () => {
    const response = createApiAiResponse({ speech: 'Hello world!', displayText: 'from the other side' });
    expect(response.speech).to.contain('Hello world!');
    expect(response.displayText).to.contain('from the other side');
  })
});

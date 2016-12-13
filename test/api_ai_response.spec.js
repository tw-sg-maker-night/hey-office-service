import { expect } from 'chai'
import createApiAiResponse from '../src/api_ai_response'

describe('base response to API.AI', () => {
  it('contains required properties', () => {
    const response = createApiAiResponse();
    expect(response).to.have.property('speech').that.is.a('string');
    expect(response).to.have.property('displayText').that.is.a('string');
    expect(response).to.have.property('data').that.is.an('object');
    expect(response).to.have.property('contextOut').that.is.an('array');
    expect(response).to.have.property('source').that.is.a('string');
  });
});

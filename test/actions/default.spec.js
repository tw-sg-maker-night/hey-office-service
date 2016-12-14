import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import httpMocks from 'node-mocks-http'
import defaultHandler from '../../src/actions/default'

chai.use(sinonChai);
const expect = chai.expect

describe('defaultHandler', () => {
  it('should respond saying I don\'t understand', sinon.test(function(done) {
    const unknownQuery = 'unknown query';
    const req = httpMocks.createRequest({ body: { result: { resolvedQuery: unknownQuery } } })
    const res = httpMocks.createResponse()
    const spy = this.spy(res, 'json')
    defaultHandler(req, res);

    expect(res.json).to.have.been.calledOnce;

    const expectedResponse = res.json.firstCall.args[0];
    expect(expectedResponse).to.have.property('speech').that.contains('don\'t understand');
    expect(expectedResponse).to.have.property('displayText').that.contains('don\'t understand');
    expect(expectedResponse).to.have.property('speech').that.contains(unknownQuery);
    expect(expectedResponse).to.have.property('displayText').that.contains(unknownQuery);
    done();
  }));
});

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import httpMocks from 'node-mocks-http'
import givePresentHandler from '../../src/actions/give_present'

chai.use(sinonChai);
const expect = chai.expect

describe('givePresentHandler', () => {
  let res;

  beforeEach(() => {
    res = httpMocks.createResponse();
  })

  it('should pass to next handler if action is not give_present', sinon.test(function(done) {
    const req = httpMocks.createRequest({ body: { result: { action: 'another_type' } } });
    const next = this.spy();
    const json = this.spy(res, 'json')
    givePresentHandler(req, res, next);

    expect(next).to.have.been.calledOnce;
    expect(json).to.not.have.been.called;
    done();
  }));

  it('should respond with the requested item', sinon.test(function(done) {
    const item = 'item'
    const req = { body: { result: { action: 'give_present', parameters: { item: item } } } };
    const next = this.spy();
    const json = this.spy(res, 'json')
    givePresentHandler(req, res, next);

    expect(next).to.not.have.been.called;
    expect(json).to.have.been.calledOnce;

    const expectedResponse = res.json.firstCall.args[0];
    expect(expectedResponse).to.have.property('speech').that.contains(item);
    expect(expectedResponse).to.have.property('displayText').that.contains(item);
    expect(expectedResponse).to.have.property('speech').that.contains('for Christmas');
    expect(expectedResponse).to.have.property('displayText').that.contains('for Christmas');
    done();
  }));
});

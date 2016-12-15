import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import httpMocks from 'node-mocks-http'
import bookMeetingRoomHandler from '../../src/actions/book_meeting_room'

chai.use(sinonChai);
const expect = chai.expect

describe('bookMeetingRoomHandler', () => {
  let res;

  beforeEach(() => {
    res = httpMocks.createResponse();
  })

  it('should pass to next handler if action is not book_meeting_room', sinon.test(function(done) {
    const req = httpMocks.createRequest({ body: { result: { action: 'another_type' } } });
    const next = this.spy();
    const json = this.spy(res, 'json')
    bookMeetingRoomHandler(req, res, next);

    expect(next).to.have.been.calledOnce;
    expect(json).to.not.have.been.called;
    done();
  }));

  it('should respond with the desired room booking', sinon.test(function(done) {
    const params = {
      meeting_room: 'Ni Hao',
      time: '10am',
      duration: { amount: 1, unit: 'hour'}
    }
    const req = { body: { result: { action: 'book_meeting_room', parameters: params } } };
    const next = this.spy();
    const json = this.spy(res, 'json')
    bookMeetingRoomHandler(req, res, next);

    expect(next).to.not.have.been.called;
    expect(json).to.have.been.calledOnce;

    const expectedResponse = res.json.firstCall.args[0];
    expect(expectedResponse).to.have.property('speech').that.contains(params.meeting_room);
    expect(expectedResponse).to.have.property('speech').that.contains(params.time);
    expect(expectedResponse).to.have.property('speech').that.contains(`${params.duration.amount} ${params.duration.unit}`);
    expect(expectedResponse).to.have.property('displayText').that.contains(params.meeting_room);
    expect(expectedResponse).to.have.property('displayText').that.contains(params.time);
    expect(expectedResponse).to.have.property('displayText').that.contains(`${params.duration.amount} ${params.duration.unit}`);
    done();
  }));
});

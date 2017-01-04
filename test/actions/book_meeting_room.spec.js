import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import httpMocks from 'node-mocks-http'
import bookMeetingRoomHandler, { createReservation } from '../../src/actions/book_meeting_room'

chai.use(sinonChai);
const expect = chai.expect;

describe('bookMeetingRoom', () => {
  let params = {
    date: '2017-01-05',
    duration: {
      amount: 30,
      unit: 'min'
    },
    room: 'ni hao',
    time: '15:00:00'
  };

  describe('bookMeetingRoomHandler', () => {
    let res, req;

    beforeEach(() => {
      res = httpMocks.createResponse();
      req = httpMocks.createRequest({ body: { result: { action: 'book_meeting_room', parameters: params } } });
    });

    it('should pass to next handler if action is not book_meeting_room', sinon.test(function(done) {
      const req = httpMocks.createRequest({ body: { result: { action: 'another_type' } } });
      const next = this.spy();
      const json = this.spy(res, 'json');
      const handler = bookMeetingRoomHandler();
      handler(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(json).to.not.have.been.called;
      done();
    }));

    it('should invoke aws lambda function with correct parameters', sinon.test(function(done) {
      const stubInvoke = this.stub();
      const aws = {
        config: { update: () => {} },
        Lambda: function() {
          this.invoke = stubInvoke;
        }
      };
      const json = this.spy(res, 'json');
      const handler = bookMeetingRoomHandler(aws);

      handler(req, res);
      expect(stubInvoke).to.have.been.calledOnce;

      const lambdaParams = stubInvoke.firstCall.args[0];
      expect(lambdaParams.FunctionName).to.equal('hey-office-meetings-dev-create')
      expect(lambdaParams.Payload).to.equal(JSON.stringify({body: JSON.stringify(createReservation(params))}))
      done();
    }));
  });

  describe('createReservation', () => {
    it('should create reservation request map with provided properties', () => {
      const expectedResult = {
        title: 'Hey Office Test',
        room: 'ni hao',
        start: '2017-01-05 15:00+08:00',
        end: '2017-01-05 15:30+08:00'
      };
      const returnValue = createReservation(params);
      expect(returnValue).to.eql(expectedResult);
    });
  });
});

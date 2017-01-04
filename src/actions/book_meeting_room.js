import moment from 'moment'
import createApiAiResponse from '../api_ai_response'

export default function bookMeetingRoomHandler(aws) {
  return function (req, res, next) {
    if (req.body.result.action !== 'book_meeting_room') {
      next();
    } else {
      const reservation = createReservation(req.body.result.parameters)

      aws.config.update({
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_KEY']
      });

      const lambda = new aws.Lambda({
        region: 'ap-southeast-1'
      });

      lambda.invoke({
        FunctionName: 'hey-office-meetings-dev-create',
        Payload: JSON.stringify({body: JSON.stringify(reservation)})
      }, (err, data) => {
        let message = 'Unable to reserve the room, please try again.';
        if (!err) {
          const responsePayload = JSON.parse(data.Payload)
          const result = JSON.parse(responsePayload.body);
          message = result.message;
        }

        res.json(createApiAiResponse({
          speech: message,
          displayText: message
        }));
      });
    }
  };
};

export function createReservation(params) {
  const title = 'Hey Office Test';
  const room = params.room;
  const startMoment = moment(`${params.date} ${params.time}`);
  const start = startMoment.format("YYYY-MM-DD HH:mmZ");
  const duration = moment.duration(params.duration.amount, params.duration.unit[0]);
  const end = startMoment.add(duration).format("YYYY-MM-DD HH:mmZ");

  return {
    title: title,
    room: room,
    start: start,
    end: end
  };
};

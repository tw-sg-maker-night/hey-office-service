import createApiAiResponse from '../api_ai_response'

const bookMeetingRoomHandler = (req, res, next) => {
  if (req.body.result.action !== 'book_meeting_room') {
    next();
  } else {
    const booking = {
      meetingRoom: req.body.result.parameters.meeting_room,
      time: req.body.result.parameters.time,
      duration: req.body.result.parameters.duration
    }
    const response = `You reserved ${booking.meetingRoom} at ${booking.time} for ${booking.duration.amount} ${booking.duration.unit}`;
    const bookMeetingRoomResponse = {
      speech: response,
      displayText: response
    }
    res.json(createApiAiResponse(bookMeetingRoomResponse));
  }
}

export default bookMeetingRoomHandler

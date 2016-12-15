import express from 'express'
import givePresentHandler from './actions/give_present'
import bookMeetingRoomHandler from './actions/book_meeting_room'
import defaultHandler from './actions/default'

const router = express.Router();

router.post('/', (req, res, next) => {
  console.log(req);
  next();
});
router.post('/', givePresentHandler);
router.post('/', bookMeetingRoomHandler);

router.post('/', defaultHandler);

export default router;

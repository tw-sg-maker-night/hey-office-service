import express from 'express'
import aws from 'aws-sdk'
import givePresentHandler from './actions/give_present'
import bookMeetingRoomHandler from './actions/book_meeting_room'
import defaultHandler from './actions/default'

const router = express.Router();

router.post('/', givePresentHandler);
router.post('/', bookMeetingRoomHandler(aws));

router.post('/', defaultHandler);

export default router;

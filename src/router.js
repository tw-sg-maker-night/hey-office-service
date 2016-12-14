import express from 'express'
import givePresentHandler from './actions/give_present'
import defaultHandler from './actions/default'

const router = express.Router();

router.post('/', (req, res, next) => {
  console.log(req);
  next();
});
router.post('/', givePresentHandler);
router.post('/', defaultHandler);

export default router;

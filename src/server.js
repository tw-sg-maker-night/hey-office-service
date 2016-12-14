import express from 'express'
import bodyParser from 'body-parser'
import router from './router'

const app = express();

app.use(bodyParser.json());
app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Say "Hey Office!" to port ${port}!`)
});

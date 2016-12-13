import express from 'express'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req);

  let response = ''

  if (req.body.result.action === 'give_present') {
    response = `Yes master Bruce, I'd buy you a ${req.body.result.parameters.item} for Christmas`
  } else {
    response = `Yes master Bruce! You said ${req.body.result.resolvedQuery}`
  }

  let apiAIresponse = {
    speech: response,
    displayText: response,
    data: {},
    contextOut: [],
    source: 'Somewhere only we know'
  };
  res.json(apiAIresponse);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Say "Hey Office!" to port ${port}!`)
});

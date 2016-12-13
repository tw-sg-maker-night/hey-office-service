import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.post('/', (req, res) => {
  const data = req.body.originalRequest.data

  let apiAIresponse = {
    speech: `Yes master Bruce! You said ${data.text}`,
    displayText: `Yes master Bruce! You said ${data.text}`,
    data: {},
    contextOut: [],
    source: 'Somewhere only we know'
  }
  res.json(apiAIresponse)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Say "Hey Office!" to port ${port}!`)
})

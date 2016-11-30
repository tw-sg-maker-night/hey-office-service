import express from 'express'

const app = express()

app.post('/', (req, res) => {
  let apiAIresponse = {
    speech: 'Yes master Bruce!',
    displayText: 'Yes master Bruce!',
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

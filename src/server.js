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

app.listen(3000, () => {
  console.log('Say "Hey Office!" to port 3000!')
})

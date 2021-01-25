const express = require('express')
const bodyParser = require('body-parser')
const { getEvents, postEvent } = require('./src/events')

const app = express()
app.use(bodyParser.json())
const port = 3000

app.get('/events', getEvents)
app.post('/events', postEvent)

app.get('/', (req, res) => {
  res.status(200).send('Hello There!')
})

app.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})
const express = require('express')
const { getEvents } = require('./src/events')

const app = express()
const port = 3000

app.get('/events', getEvents)

app.get('/', (req, res) => {
  res.status(200).send('Hello There!')
})

app.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})
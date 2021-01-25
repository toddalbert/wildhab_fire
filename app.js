const express = require('express')

const app = express()
const port = 3000

app.get('/events', (req, res) => {
  res.send('Here are all of the events')
})

app.get('/', (req, res) => {
  res.status(200).send('Hello There!')
})

app.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})
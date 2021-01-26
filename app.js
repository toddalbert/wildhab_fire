const express = require('express')
const bodyParser = require('body-parser')
const { getEvents, postEvent } = require('./src/events')
const { getPeople, postPerson } = require('./src/users')
const { getSingleEvent, deleteEvent } = require('./src/events/eventId')

const app = express()
app.use(bodyParser.json())
const port = 3000

app.get('/events', getEvents)
app.get('/events/:eventId', getSingleEvent)
app.post('/events', postEvent)
app.delete('/events/:eventId', deleteEvent)

app.get('/people', getPeople)
app.post('/people', postPerson)

app.get('/', (req, res) => {
  res.status(200).send('Hello There!')
})

app.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})
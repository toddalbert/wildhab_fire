const express = require('express')
const bodyParser = require('body-parser')

const { getEvents, postEvent } = require('./src/events')
const { getPeople, postPerson } = require('./src/users')
const { getPerson, updatePerson } = require('./src/users/users.js')
const { getSingleEvent, deleteEvent, updateEvent } = require('./src/events/eventId')

const app = express()
app.use(bodyParser.json())
const port = 5001

app.get('/events', getEvents)
app.get('/events/:eventId', getSingleEvent)
app.post('/events', postEvent)
app.delete('/events/:eventId', deleteEvent)
app.patch('/events/:eventId', updateEvent)

app.get('/people', getPeople)
app.post('/people', postPerson)
app.get('/person/:personId', getPerson)
app.patch('/person/:personId', updatePerson)



app.listen(port, () => {
	console.log('listening on http://localhost:' + port)
})

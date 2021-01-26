const admin = require("firebase-admin")
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-d3c450485c.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}
const firestore = admin.firestore()
const eventsRef = firestore.collection('events')

exports.getSingleEvent = (req, res) => {
  if(!firestore) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    firestore = admin.firestore()
  }
  const { eventId } = req.params
  eventsRef.doc(eventId).get()
    .then(doc => {
      let event = doc.data()
      event.id = doc.id
      res.status(200).json({
        status: 'success',
        data: event,
        message: 'Events loaded successfully',
        statusCode: 200
      })
    })
    .catch(err => {
      res.status(500).send({
        status: 'error',
        data: err,
        message: 'Error getting events',
        statusCode: 500
      })
    })
}
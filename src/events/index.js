const admin = require("firebase-admin")
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-d3c450485c.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const firestore = admin.firestore()

exports.getEvents = (req, res) => {
  if(!firestore) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    firestore = admin.firestore()
  }
  firestore.collection('events').get()
    .then(collection => {
      const eventsResults = collection.docs.map(doc => {
        let event = doc.data()
        event.id = doc.id
        return event
      })
      res.status(200).json(eventsResults)
    })
    .catch(err => {
      res.status(500).send({err})
    })
}


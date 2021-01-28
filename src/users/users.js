const admin = require('firebase-admin')
const serviceAccount = require('../../wildhabitatexercise-firebase-adminsdk-z62ei-d3c450485c.json')

if (!admin.app.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	})
}

const firestore = admin.firestore()
const peopleRef = firestore.collection('people')

exports.getPerson = (req, res) => {
	if (!firestore) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
		firestore = admin.firesstore()
	}

	const { personId } = req.params
	peopleRef.doc(personId).get()
	peopleRef
		.doc(personId)
		.get()
		.then(doc => {
			let person = doc.data()
			person.id = doc.id
			res.status(200).json({
				status: 'success',
				data: person,
				message: 'person loaded $$$$',
				statusCode: 200,
			})
		})
		.catch(err => {
			res.status(500).send({
				status: 'error',
				data: err,
				message: 'Error getting events',
				statusCode: 500,
			})
		})
}

exports.deletePerson = (req, res) => {
	if (!firestore) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
		firestore = admin.firesstore()
	}
	peopleRef
		.doc(req.params.personId)
		.delete()
		.then(() => {
			res.status(200).json({
				status: 'success',
				message: 'person Deleted ok',
				statusCode: 200,
			})
		})
		.catch(err => {
			res.status(500).json({
				status: 'error',
				data: err,
				message: 'Error Deleting person',
				statusCode: 500,
			})
		})
}

exports.updatePerson = (req, res) => {
	if (!firestore) {
	  admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	  });
	  firestore = admin.firestore();
	}
	personRef
	  .doc(req.params.userId)
	  .update(req.body)
	  .then(() => {
		res.status(200).json({
		  status: "updated",
		  message: "Person updated",
		  statusCode: 200,
		});
		return
	  })
	  .catch((err) => {
		res.status(500).json({
		  status: "error",
		  data: err,
		  message: "Error updating Person",
		  statusCode: 500,
		});
	  });
}
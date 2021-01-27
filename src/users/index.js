const admin = require('firebase-admin')
const serviceAccount = require('../../wildhabitatexercise-firebase-adminsdk-z62ei-d3c450485c.json')

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	})
}
const firestore = admin.firestore()
const peopleRef = firestore.collection('people')

exports.postPerson = (req, res) => {
	if (!firestore) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
		firestore = admin.firestore()
	}

	let newPerson = req.body
	let now = admin.firestore.FieldValue.serverTimestamp()
	newPerson.updated = now
	newPerson.created = now
	peopleRef
		.add(newPerson)
		.then(docRef => {
			console.log('docid', docRef.id)
			peopleRef
				.doc(docRef.id)
				.get()
				.then(snapshot => {
					let person = snapshot.data()
          person.id = snapshot.id
					res.status(200).json({
						status: 'success',
						data: person,
						message: 'Person added successfully',
						statusCode: 200,
					})
					return
				})
		})
		.catch(err => {
			res.status(500).send({
				status: 'error',
				data: err,
				message: 'Error creating person',
				statusCode: 500,
			})
		})
}

exports.getPeople = (req, res) => {
	if (!firestore) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
		firestore = admin.firestore()
	}
	peopleRef
		.get()
		.then(collection => {
			const peopleResults = collection.docs.map(doc => {
				let person = doc.data()
				person.id = doc.id
				return person
			})
			res.status(200).json({
				status: 'success',
				data: peopleResults,
				message: 'People loaded successfully',
				statusCode: 200,
			})
		})
		.catch(err => {
			res.status(500).send({
				status: 'error',
				data: err,
				message: 'Error getting people',
				statusCode: 500,
			})
		})
}

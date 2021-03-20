// The Firebase Admin SDK to access Firestore.
// const admin = require('firebase-admin');
const firebase = require('firebase');

firebase.initializeApp({ projectId: "syp-fyp" });
const db = firebase.firestore();
db.useEmulator("localhost", 8080);

module.exports = db

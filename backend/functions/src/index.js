// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const express = require('express');
const {getTags, addTag} = require("./tags");
const {addMessage} = require('./message');
const app = express();

app.get('/', (request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

app.get('/addMessage', addMessage);
app.post('/tag', addTag);
app.get('/tags', getTags)

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        // Grab the current value of what was written to Firestore.
        const original = snap.data().original;

        // Access the parameter `{documentId}` with `context.params`
        functions.logger.log('Uppercasing', context.params.documentId, original);

        const uppercase = original.toUpperCase();

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to Firestore.
        // Setting an 'uppercase' field in Firestore document returns a Promise.
        return snap.ref.set({uppercase}, {merge: true});
    });

exports.app = functions.https.onRequest(app)

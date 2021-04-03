// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const express = require('express');
const {getTags, addTag, stop} = require("./tags");
const {addMessage} = require('./message');
const app = express();
const db = require('./firestoredb');

app.get('/', (request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

app.get('/addMessage', addMessage);
app.post('/tag', addTag);
app.get('/tags', getTags)
app.get('/stop', stop)

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

exports.checkSpeed = functions.firestore.document('/averageTime/{id}').onUpdate(async (change, context) => {
    const {tagID, avgTime, count} = change.after.data();
    // TODO: need to add a tag to position mapping which has the distance b/w tags to get distance
    // will hardcode distance and not check for if the tags just created is next to the last created one
    const  tagsRef = db.collection('averageTime')
    let lastDetected = await tagsRef
        .orderBy('avgTime', 'desc')
        .limit(2)
        .get();

    if (lastDetected.empty){
        functions.logger.info("no previous tags detected");
    } else {
        lastDetected = lastDetected.docs[1]
        console.log(avgTime, lastDetected.data().avgTime)
        const diffDuration = avgTime - lastDetected.data().avgTime;
        functions.logger.info(`difference in time in between tags ${tagID} and ${lastDetected.data().tagID} is ${diffDuration}`);
        let speed = 3/(diffDuration/1000);
        functions.logger.info(`speed detected is ${speed} m/s`);
    }
    return null
})

exports.app = functions.https.onRequest(app)

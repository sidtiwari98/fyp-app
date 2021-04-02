const db = require('./firestoredb');
const firebase = require('firebase')
const functions = require('firebase-functions');


exports.getTags = async (req, res) => {
    try {
        const tagQuerySnapshot = await db.collection('tags').get();
        const tags = [];
        tagQuerySnapshot.forEach(
            (doc) => {
                tags.push({
                    id: doc.id,
                    data:doc.data()
                });
            }
        );
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.addTag = async (req, res) => {
    functions.logger.info("Will add tag now!", {structuredData: true});
    // Grab the text parameter.
    const {tagID} = req.body;
    const time = firebase.firestore.Timestamp.now();

    try {
        // Push the new message into Firestore using the Firebase Admin SDK.
        const ref = db.collection('tags').doc(time.toMillis().toString())
        await ref.set({tagID, time});
        functions.logger.info(`Tag with ID: ${tagID} detected and added with UID ${ref.id}.`)

        // Send back a message that we've successfully written the message
        res.json({result: `Tag with ID: ${tagID} detected and added with UID ${ref.id}.`});
    } catch (error) {
        functions.logger.error(error)
        res.status(500).send(error);
    }
};

exports.stop = async (req, res) => {
    functions.logger.info("Will stop session now!", {structuredData: true});

    const collectionRef = db.collection('tags');
    const query = collectionRef.orderBy('__name__').limit(10);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });

    async function deleteQueryBatch(db, query, resolve) {
        const snapshot = await query.get();

        const batchSize = snapshot.size;
        if (batchSize === 0) {
            // When there are no documents left, we are done
            resolve();
            return;
        }

        // Delete documents in a batch
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
            deleteQueryBatch(db, query, resolve);
        });
    }
}
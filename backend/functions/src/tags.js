const db = require('./firestoredb');

exports.getTags = async (req, res) => {
    try {
        const tagQuerySnapshot = await db.collection(tagCollection).get();
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
    // Grab the text parameter.
    const {tagID, time} = req.body;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await db.collection('tags').add({tagID, time});
    // Send back a message that we've successfully written the message
    res.json({result: `Tag with ID: ${tagID} detected and added with UID ${writeResult.id}.`});
};
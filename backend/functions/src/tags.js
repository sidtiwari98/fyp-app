const db = require('./firestoredb');
const firebase = require('firebase')
const functions = require('firebase-functions');
const moment = require('moment');


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
    const time = moment().format("x");

    try{
        let tagToCheck = await db.collection('validTags').doc(tagID.toString()).get()
        if (!tagToCheck.exists){
            functions.logger.info(`ERROR: Tag ${tagID} is invalid`)
            res.status(500).send(`ERROR: Tag ${tagID} is invalid`);
        }
        if(!tagToCheck.data().isAuth){
            const areaViolation = await db.collection('violations').add({tagID, isAreaViolation: true,  isSpeedViolation: false, time: parseInt(time)})
            functions.logger.info(`Tag with ID: ${tagID} detected as area violation with uid ${areaViolation.id}`)
            res.json({result:`Tag with ID: ${tagID} detected as violation with uid ${areaViolation.id}`})
        }
    }catch(error){
        functions.logger.error(error)
        res.status(500).send(error);
    }

    try {
        // Push the new message into Firestore using the Firebase Admin SDK.
        const tagsRead = await db.collection('tags')
            .where('time', '>' ,time-1000)
            .get()

        if (tagsRead.empty){
            functions.logger.info("no previous tags detected");
        } else {
            let frequency = {}
            tagsRead.docs.forEach((tag) => {
                const tagID = tag.data().tagID
                if (frequency.hasOwnProperty(tagID)) {
                    frequency[tagID]+=1;
                } else {
                    frequency[tagID]=1;
                }
            })
            functions.logger.info("frequency map", frequency);
            let maxFrequencyTag = Object.entries(frequency).reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)[0];
            functions.logger.info("max frequency tag", maxFrequencyTag);
            if (tagID.toString() === maxFrequencyTag.toString()){
                const avgTimeRef = db.collection('averageTime').doc(maxFrequencyTag)
                let tagTime = await avgTimeRef.get()
                if (tagTime.exists){
                    const data = tagTime.data();
                    await avgTimeRef.update({avgTime: ((data.avgTime*data.count)+parseInt(time))/(data.count+1), count: data.count+1})
                } else {
                    await avgTimeRef.set({tagID, avgTime: parseInt(time), count: 1 })
                }
            } else {
                functions.logger.info("type mismatch", tagID, maxFrequencyTag);
            }
        }
        const ref = db.collection('tags').doc(time)
        await ref.set({tagID, time: parseInt(time)});
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

    const tagsRef = db.collection('tags');
    const tagsQuery = tagsRef.orderBy('__name__').limit(10);

    const avgTimeRef = db.collection('averageTime');
    const avgTimeQuery = avgTimeRef.orderBy('__name__').limit(10);

    clearDB = [
        new Promise((resolve, reject) => {
            deleteQueryBatch(db, tagsQuery, resolve).catch(reject);
        }),
        new Promise((resolve, reject) => {
            deleteQueryBatch(db, avgTimeQuery, resolve).catch(reject);
        })
    ]
    let delPromise = await Promise.all(clearDB)

    functions.logger.info(delPromise);
    return res.json({msg: "Done"});


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

exports.addValidTags = async (req, res) =>{
    const {tagID} = req.body
    const {isAuth} = req.body
    try{
        const tagInfo = db.collection('validTags').doc(tagID.toString())
        await tagInfo.set({tagID, isAuth})
        functions.logger.info(`Tag with ID: ${tagID} added as a valid Tag`)
        res.json({result:`Tag with ID: ${tagID} added as a valid Tag`})
    }
    catch(error){
        functions.logger.error(error)
        res.status(500).send(error); 
    }
}
import firebase from "firebase/app";
import "firebase/firestore";
import moment from 'moment'

firebase.initializeApp({projectId: "syp-fyp"});
const db = firebase.firestore();
db.useEmulator("localhost", 8080);

export const getCurrentTagData = (callback) => {
    return db.collection('averageTime').onSnapshot((querySnapshot) => {
        if (querySnapshot.docChanges().length > 1) {
            console.info("More than 1 changes detected in averageTime DB: Most likely first render/rerender", querySnapshot.docChanges())
        } else if (querySnapshot.docChanges().length === 1) {
            callback(querySnapshot.docChanges()[0].doc.data())
        }
    });
};

export const getViolationsList = (callback) => {
    const startOfDayTime = moment().startOf('day').format("x");
    return db.collection('violations').onSnapshot((querySnapshot) => {
        var violationsList = [];
        querySnapshot.forEach((doc) => {
            if (parseInt(doc.data().time) >= parseInt(startOfDayTime)) {
                violationsList.push(doc.data());
            }
        });
        callback(violationsList)
    });
};

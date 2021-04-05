import firebase from "firebase/app";
import "firebase/firestore";
import moment from 'moment'

firebase.initializeApp({ projectId: "syp-fyp" });
const db = firebase.firestore();
db.useEmulator("localhost", 8080);

export const getaverageTimeList = (callback) => {
    return db.collection('averageTime').onSnapshot((querySnapshot) => {
        var averageTimeList = [];
        querySnapshot.forEach((doc) => {
            averageTimeList.push(doc.data());
        });
        callback(averageTimeList)
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

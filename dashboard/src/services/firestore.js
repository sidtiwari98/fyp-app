import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({ projectId: "syp-fyp" });
const db = firebase.firestore();
db.useEmulator("localhost", 8080);

export const getaverageTimeList = (callback) => {
    db.collection('averageTime').onSnapshot((querySnapshot) => {
        var averageTimeList = [];
        querySnapshot.forEach((doc) => {
            averageTimeList.push(doc.data());
        });
        callback(averageTimeList)
    });
};

export const getViolationsList = (callback) => {
    db.collection('violations').onSnapshot((querySnapshot) => {
        var violationsList = [];
        querySnapshot.forEach((doc) => {
            violationsList.push(doc.data());
        });
        callback(violationsList)
    });
};

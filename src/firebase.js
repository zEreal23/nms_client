
// import * as firebase from "firebase/app"; // old way, wont work anymore
import firebase from "firebase/app";
import "firebase/auth";
// firebase config
const config = {
    apiKey: "AIzaSyD4qcmvcoLrPIod10R0pCU2jFUYbynaM-I",
    authDomain: "nms-web-685bf.firebaseapp.com",
    projectId: "nms-web-685bf",
    storageBucket: "nms-web-685bf.appspot.com",
    messagingSenderId: "455096639362",
    appId: "1:455096639362:web:1a50aa724af875d37ef99b",
    measurementId: "G-L9RG6TBGGD"
};
// initialize firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
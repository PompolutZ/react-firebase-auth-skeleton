import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCvwmNhhs-1PEF9Qk1gOYNpp-m65-0JJNY",
    authDomain: "exopen-c2af4.firebaseapp.com",
    databaseURL: "https://exopen-c2af4.firebaseio.com",
    projectId: "exopen-c2af4",
    storageBucket: "exopen-c2af4.appspot.com",
    messagingSenderId: "1003479661787"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.db = app.database();
        this.auth = app.auth();
    }

    // *** Auth API ***
    createUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    signInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => this.auth.signOut();

    sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email);

    updatePassword = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import config from './config';

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
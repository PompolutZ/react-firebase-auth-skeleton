import app from "firebase/app";
import "firebase/database";
import "firebase/auth";

// CREATE ./config.js file to export your firebase configuration here.
import config from "./config";
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

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.user(user.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();

            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            next({
              uid: user.uid,
              email: user.email,
              ...dbUser
            });
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.ref(`/users/${uid}`);

  users = () => this.db.ref(`users`);
}

export default Firebase;

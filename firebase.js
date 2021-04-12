import * as firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD8OYsSg7KanFThJgTZDyOJupsitM1av_k",
    authDomain: "signal-clone-8b5fb.firebaseapp.com",
    projectId: "signal-clone-8b5fb",
    storageBucket: "signal-clone-8b5fb.appspot.com",
    messagingSenderId: "387404449790",
    appId: "1:387404449790:web:4a0947057c84333a3522af"
  };

  let app;

  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app()
  }

  const db = app.firestore()
  const auth = firebase.auth()

  export { db, auth}
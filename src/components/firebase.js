import app from 'firebase/app'
const firebase = require('firebase');
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
  apiKey: "AIzaSyD5kJDsNUavyacmRVwP9HvaZD7d4o4qX2Q",
  authDomain: "salty-rogue.firebaseapp.com",
  databaseURL: "https://salty-rogue.firebaseio.com",
  projectId: "salty-rogue",
  storageBucket: "salty-rogue.appspot.com",
  messagingSenderId: "293014247485"
};

var db = firebase.firestore()

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
  }
  
  async getCallRecord() {
    const record = await this.db.collection('PhoneRecords').get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc) {
        //doc.data() is never undefined for query doc snapshots
        return doc.id, ' => ', doc.data()
      })
    })
        // return record.get('PhoneRecords')
  }
  
}

export default new Firebase()
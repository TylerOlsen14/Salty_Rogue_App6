import app from 'firebase/app'
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
    const record = await this.db.doc('PhoneRecords/').get()
    return record.get('record')
  }
  
}

export default new Firebase()
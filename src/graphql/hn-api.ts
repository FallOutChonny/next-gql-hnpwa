if (!(process as any).browser) {
  require('firebase/database')
}

import firebase from 'firebase/app'
import { HN_API_URL, HN_API_VERSION } from '../config'

if (!firebase.apps.length) {
  firebase.initializeApp({ databaseURL: HN_API_URL })
}

const api = firebase.database().ref(HN_API_VERSION)

export default api

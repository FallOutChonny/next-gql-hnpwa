import firebase from 'firebase/app'
import { HN_API_URL, HN_API_VERSION } from '../config'

let api: firebase.database.Reference

if (!firebase.apps.length) {
  firebase.initializeApp({ databaseURL: HN_API_URL })
}

if (!(process as any).browser) {
  require('firebase/database')
  api = firebase.database().ref(HN_API_VERSION)
}

export default api

import firebase from 'firebase'
import { HN_API_URL, HN_API_VERSION } from '../config'

const app = firebase.initializeApp({
  databaseURL: HN_API_URL,
})

const api = app.database().ref(HN_API_VERSION)

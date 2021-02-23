import firebase from 'firebase/app'
import { HN_API_URL, HN_API_VERSION } from './config'
import type { NewsItems } from './news-items'

let api: firebase.database.Reference

if (!firebase.apps.length) {
  firebase.initializeApp({ databaseURL: HN_API_URL })
}

if (!(process as any).browser) {
  require('firebase/database')
  api = firebase.database().ref(HN_API_VERSION)
}

export async function fetch(url: string) {
  return (await api.child(url).once('value')).val()
}

export async function fetchNewsItems(id: number): Promise<NewsItems> {
  return await fetch(`item/${id}`)
}

export async function loopFetchNewsItemsComments(items: NewsItems) {
  if (items.kids && items.kids.length > 0) {
    items.kids = await Promise.all(
      items.kids.map(async id =>
        loopFetchNewsItemsComments(await fetchNewsItems(id as any)),
      ),
    )
  }

  return items
}

export async function fetchUser(id: string) {
  return await fetch(`user/${id}`)
}

export default api

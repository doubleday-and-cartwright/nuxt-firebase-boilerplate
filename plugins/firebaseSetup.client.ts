// This plugin sets up Firebase and associated services to be used throughout the app.
// Plugins are just run once and set up at the beginning of the creation of the app.

import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
// import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth, connectAuthEmulator } from 'firebase/auth' // Can only run on client
// See: https://www.reddit.com/r/Nuxt/comments/y5e42k/component_auth_has_not_been_registered_yet_error/

import * as firebaseSettings from '../firebase.json'

export default defineNuxtPlugin((NuxtApp) => {
  const nuxtApp = useNuxtApp()
  const env = nuxtApp.$config.public

  console.log('ENV:', env)

  const firebaseConfig = {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: env.FIREBASE_AUTH_DOMAIN,
    projectId: env.FIREBASE_PROJECT_ID,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
    appId: env.FIREBASE_APP_ID,
    measurementId: env.FIREBASE_MEASUREMENT_ID
  }
  const firebaseApp = initializeApp(firebaseConfig)

  initUser()

  const auth = getAuth()
  const firestore = getFirestore()

  if (env.USE_FIREBASE_EMULATORS === 'true') {
    const firebaseEmulator = firebaseSettings.emulators
    console.log('Connecting to Firebase emulators...')
    connectFirestoreEmulator(firestore, 'localhost', firebaseEmulator.firestore.port)
    connectAuthEmulator(auth, 'http://localhost:' + firebaseEmulator.auth.port)
  }

  NuxtApp.provide('firestore', firestore)
  NuxtApp.provide('auth', auth)
})
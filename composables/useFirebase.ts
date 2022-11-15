import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export const useFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDiVvXzIW-Vh_aTY1VtxXEIw1lqcIu_cVk',
    authDomain: 'prov-xyz-dev.firebaseapp.com',
    projectId: 'prov-xyz-dev',
    storageBucket: 'prov-xyz-dev.appspot.com',
    messagingSenderId: '816369228861',
    appId: '1:816369228861:web:92de385a8fb99558f95e54',
    measurementId: 'G-F26QW8GRSF'
  }
  const firebaseApp = initializeApp(firebaseConfig)
  const firestore = getFirestore(firebaseApp)

  return {
    firebaseApp,
    firestore
  }
}
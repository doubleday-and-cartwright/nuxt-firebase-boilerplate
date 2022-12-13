/**
 * Set up globally used Firebase functionality.
 */

import {
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  ApplicationVerifier
} from 'firebase/auth'

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

export const createUser = async () => {

}

export const signInUser = async (phoneNumber: string, appVerifier: ApplicationVerifier) => {
  const confirmationResult = await signInWithPhoneNumber(getAuth(), phoneNumber, appVerifier)
    .catch((error: Error) => {
      console.log('Unable to send SMS:', error)
    })
  console.log('Verification SMS sent.')
  return confirmationResult
}

export const initUser = async () => {
  onAuthStateChanged(getAuth(), (user) => {
    console.log('User auth state changed.')
  })
}
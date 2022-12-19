/**
 * Set up globally used Firebase functionality.
 */

import {
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  ApplicationVerifier,
  User
} from 'firebase/auth'

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

export const createUser = async () => {

}

export const signInUser = async (phoneNumber: string, appVerifier: ApplicationVerifier) => {
  const confirmationResult = await signInWithPhoneNumber(getAuth(), phoneNumber, appVerifier)
  return confirmationResult
}

/**
 * Begin listening for changes on the auth user.
 */
export const initUser = async () => {
  console.log('Initializing user.')
  const auth = getAuth()
  const currentUser = useCurrentUser()

  // Wait for onAuthStateChanged
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      console.log('Firebase user auth state changed:', user)
      // Save the updated user data to the state
      currentUser.value = user as User

      if (user) {
        console.log('An authenticated user is present.')
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

/**
 * Sign out the currently authenticated Firebase user and direct them to the index.
 */
export const signOutUser = async () => {
  const router = useRouter()
  try {
    useUserProfileUnsubscribe()

    await getAuth().signOut()
    router.push('/')
  } catch (err) {
    alert('Error signing out.')
  }
}
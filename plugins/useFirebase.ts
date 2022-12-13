export default defineNuxtPlugin((NuxtApp) => {
  const { firestore } = useFirebase()

  NuxtApp.provide('firestore', firestore)
})
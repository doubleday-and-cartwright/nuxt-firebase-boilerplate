/**
 * This plugin manages route guards for the app.
 */

export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-test', () => {
    console.log('This middlware runs everywhere.')
  }, { global: true })

  // Requires a logged in user
  addRouteMiddleware('auth', () => {
    const { $auth } = useNuxtApp()
    console.log($auth?.currentUser)
    if (!$auth?.currentUser?.uid) {
      return abortNavigation()
    }
  })
})
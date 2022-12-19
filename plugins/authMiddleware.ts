/**
 * This plugin manages route guards for the app.
 */

export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-test', () => {
    // console.log('This middlware runs everywhere.')
  }, { global: true })

  // Requires a logged in user
  // NOTE: Currently this redirects the user to the root URL on refresh
  addRouteMiddleware('auth', () => {
    const { $auth } = useNuxtApp()
    console.log('Auth Middleware, CURRENT USER:', $auth?.currentUser)
    if (!$auth?.currentUser?.uid) {
      console.log('No UID. Redirecting to home page.')
      return navigateTo('/')
    } else {
      console.log('UID present.')
    }
  })
})
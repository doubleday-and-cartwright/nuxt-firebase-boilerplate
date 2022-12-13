<template>
  <h1>Login</h1>
  <input v-model="phoneNumber" type="phone" />
  <button id="sign-in-button" class="block" @click="signIn">
    Login
  </button>

  <input v-model="verificationCode" type="text">
  <button class="block" @click="confirmCode">
    Confirm
  </button>
</template>

<script setup>
import { RecaptchaVerifier } from 'firebase/auth'
const { $auth } = useNuxtApp()

// Data
const phoneNumber = ref('')
const verificationCode = ref('')
const confirmationResult = ref()

onMounted(() => {
  window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible', // Invisible means that there's no input required from the user
    'callback': (response) => {
      console.log('Recaptcha Response', response)
      this.signIn()
    }
  }, $auth)
})

/**
 * Send a verification code to the user's phone
 */
async function signIn () {
  console.log('Signing in...')
  const confirmation = await signInUser(phoneNumber.value, window.recaptchaVerifier)
  confirmationResult.value = confirmation
}

/**
 * Confirm the 2FA verification code that was sent to the user's phone
 */
async function confirmCode () {
  console.log('Confirming with code', verificationCode.value)
  const user = await confirmationResult.value.confirm(verificationCode.value)
    .catch((error) => {
      console.log(error)
    })
  console.log('USER', user)
}
</script>
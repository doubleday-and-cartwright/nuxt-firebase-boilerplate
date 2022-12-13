<!--
  This view provides basic login functionality, currently using a phone number.
-->

<template>
  <h1>Login</h1>

  <div class="input-group">
    <label for="phone-number-input">Phone Number</label>
    <input
      v-model="phoneNumber"
      placeholder="+14445556666"
      id="phone-number-input"
      type="phone"
    />
    <button id="sign-in-button" class="block" @click="signIn">
      Login
    </button>
  </div>

  <div class="input-group">
    <label for="verification-code-input">Verification Code</label>
    <input
      v-model="verificationCode"
      placeholder="123456"
      id="verification-code-input"
      type="text"
    >
    <button class="block" @click="confirmCode">
      Confirm
    </button>
  </div>

  <client-only>
    <pre>{{ currentUser }}</pre>
  </client-only>
</template>

<script setup>
import { RecaptchaVerifier } from 'firebase/auth'
const { $auth } = useNuxtApp()

const currentUser = useCurrentUser()

// Data
const phoneNumber = ref('')
const verificationCode = ref('')
const confirmationResult = ref()

onMounted(() => {
  // Set up the recaptcha for phone based authentication
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
  try {
    const confirmation = await signInUser(phoneNumber.value, window.recaptchaVerifier)
    confirmationResult.value = confirmation
    console.log('Verification SMS sent.')
    alert('Successfully sent SMS.')
  } catch (err) {
    console.log('Unable to send SMS:', err)
    alert(err.message)
  }
}

/**
 * Confirm the 2FA verification code that was sent to the user's phone
 */
async function confirmCode () {
  console.log('Confirming with code', verificationCode.value)
  try {
    const user = await confirmationResult.value.confirm(verificationCode.value)
    console.log('Logged in. User data:', user)
  } catch (err) {
    console.log('Verification code error:', err)
    alert(err.message)
  }
}
</script>
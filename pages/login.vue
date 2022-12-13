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
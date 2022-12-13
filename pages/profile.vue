<template>
  <h1>User Profile</h1>
  <h2>Username: {{ userProfile?.username }}</h2>
  <p>My data:</p>
  <pre>{{ userProfile }}</pre>
  
  <label for="username-input">New Username</label>
  <input
    id="username-input"
    type="text"
    v-model="inputValue"
    placeholder="New Username"
  />
  <button @click="updateUserProfile">Save</button>
</template>

<script setup>
import { ref } from 'vue'
import { doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore'

const { $firestore } = useNuxtApp()

const currentUser = useCurrentUser()
const userProfile = useUserProfile()
const userProfileUnsubscribe = useUserProfileUnsubscribe()

const inputValue = ref('')

definePageMeta({
  middleware: ['auth']
})

onMounted(async() => {
  if (!userProfileUnsubscribe.value) {
    console.log('Setting up user profile listener.')
    const docRef = doc($firestore, 'users', currentUser.value.uid)

    userProfileUnsubscribe.value = onSnapshot(docRef, (snap) => {
      console.log('Firestore update:', snap.data())
      userProfile.value = snap.data()
    })
  } else {
    console.log('Already subscribed.')
  }
})

async function updateUserProfile () {
  console.log('Updating userProfile data:', inputValue.value)
  console.log('user', currentUser)
  await setDoc(doc($firestore, 'users', currentUser.value.uid), {
    username: inputValue.value
  }, { merge: true})
  console.log('Updated')
}
</script>

<style>

</style>
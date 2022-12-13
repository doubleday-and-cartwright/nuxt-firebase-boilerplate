<template>
  <h1>User Profile</h1>
  <h2>Username: {{ testData?.username }}</h2>
  <p>My data:</p>
  <pre>{{ testData }}</pre>
  
  <label for="username-input">New Username</label>
  <input
    id="username-input"
    type="text"
    v-model="inputValue"
    placeholder="New Username"
  />
  <button @click="updateTestData">Save</button>
</template>

<script setup>
import { ref } from 'vue'
import { doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore'

const { $firestore } = useNuxtApp()

const currentUser = useCurrentUser()

const testData = ref({})
const inputValue = ref('')

definePageMeta({
  middleware: ['auth']
})

onMounted(async() => {
  const docRef = doc($firestore, 'users', currentUser.value.uid)

  onSnapshot(docRef, (snap) => {
    console.log('Firestore update:', snap.data())
    testData.value = snap.data()
  })
})

async function updateTestData () {
  console.log('Updating test data:', inputValue.value)
  console.log('user', currentUser)
  await setDoc(doc($firestore, 'users', currentUser.value.uid), {
    username: inputValue.value
  }, { merge: true})
  console.log('Updated')
}
</script>

<style>

</style>
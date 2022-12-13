<template>
  <h1>This is the "{{ testData?.title || 'Not Set' }}" page</h1>
  <pre>{{ testData }}</pre>
  
  <input type="text" v-model="inputValue" />
  <button @click="updateTestData">Save</button>
</template>

<script setup>
import { ref } from 'vue'
import { doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore'

const { $firestore } = useNuxtApp()

const testData = ref({})
const inputValue = ref('')

onMounted(async() => {
  const docRef = doc($firestore, 'test-collection', 'settings')

  onSnapshot(docRef, (snap) => {
    console.log('Firestore update:', snap.data())
    testData.value = snap.data()
  })
})

async function updateTestData () {
  console.log('Updating test data:', inputValue.value)
  await setDoc(doc($firestore, 'test-collection', 'settings'), {
    title: inputValue.value
  }, { merge: true})
  console.log('Updated')
}
</script>

<style>

</style>
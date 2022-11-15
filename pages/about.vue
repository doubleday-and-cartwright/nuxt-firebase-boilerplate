<template>
  <h1>This is the About page</h1>
  <pre>{{ data }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore'

const data = ref({})

onMounted(async() => {
  const { firestore } = useFirebase()
  const docRef = doc(firestore, 'test-collection', 'settings')

  onSnapshot(docRef, (snap) => {
    console.log('Firestore update:', snap.data())
    data.value = snap.data()
  })
})
</script>

<style>

</style>
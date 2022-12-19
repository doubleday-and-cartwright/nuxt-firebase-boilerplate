<template>
  <header>
    <NuxtLink class="brand" to="/">The App</NuxtLink>

    <client-only>
      <nav>
        <NuxtLink v-if="currentUser" to="profile">Profile</NuxtLink>
        <NuxtLink v-if="!currentUser" to="login">Login</NuxtLink>
        <button v-else @click="signOutUser">Logout {{ currentUser.phoneNumber }}</button>
      </nav>
    </client-only>
  </header>
</template>

<script setup>
const currentUser = useCurrentUser()
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: $s;
  display: flex;
  justify-content: space-between;

  .brand,
  nav {
    flex: 1;
  }
  
  nav {
    text-align: right;
    a {
      padding: 0 $s;
    }
  }
}
</style>
<template>
  <header>
    <h1>The App Title</h1>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
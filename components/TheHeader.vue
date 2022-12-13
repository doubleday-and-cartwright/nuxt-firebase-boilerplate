<template>
  <header>
    <router-link class="brand" to="/">The App</router-link>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="about">About</router-link>
      <router-link to="login">Login</router-link>
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
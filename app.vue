<template>
  <div>
    <TheHeader />
    <!-- Display contents from /pages directory based on route -->
    <NuxtPage />
  </div>
</template>

<style lang="scss">
// CSS Resets
* {
  margin: 0;
  padding: 0;
}
// Set global font size
html {
  font-size: 16px;
}
body {
  padding-top: 60px;
}
p {
  font-size: 1rem;
}
</style>
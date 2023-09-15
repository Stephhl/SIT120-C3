<template>
  <div class="centered-content">
    <h1>Hello! This is the second page</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink><br>
      <RouterLink to="/SecondPage">Second Page</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.centered-content {
  text-align: center; 
  margin-top: 20vh; 
}

nav {
  margin-top: 20px; 
}
</style>
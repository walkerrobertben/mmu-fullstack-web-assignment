<template>
  <div class="b-form-container">
    <n-card>
      <LoginForm/>
    </n-card>
  </div>

</template>

<style>
.b-form-container {
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 20rem;
  height: calc(100vh - 6rem);

  margin: auto;
  padding: 3rem;
}
</style>

<script>

import LoginForm from "../components/forms/login.vue"

export default {
  components: {LoginForm} 
}
</script>
<template>
  <div class="d-flex d-flex-row justify-content-center align-self-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
  div.d-flex {
    margin-top: 2em;
  }
</style>

<script>

export default {
  name: 'loader'
};
</script>

<template>
  <div class="alert alert-danger fixed-top center-block" role="alert">
    <span>{{message}}</span>
    <button type="button" class="close" aria-label="Close" v-on:click="close" >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>

import { UNSET_ERROR } from '../store/mutationTypes';

export default {
  name: 'alert',
  props: ['message'],
  methods: {
    close() {
      this.$store.commit(UNSET_ERROR);
    }
  }
};
</script>

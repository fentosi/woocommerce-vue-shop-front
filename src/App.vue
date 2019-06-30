<template>
  <div id="app">
   <navbar></navbar>
   <alert v-if="error" v-bind:message="error"></alert>
   <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Navbar from './components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusSquare, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Alert from './components/Alert';
import { mapState } from 'vuex';

library.add(faMinusSquare, faPlusSquare, faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

export default {
  name: 'App',
  components: { Navbar, Alert },
  computed: {
    ...mapState(['error'])
  }
};
</script>

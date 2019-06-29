<template>
  <div id="app">
   <navbar></navbar>
   <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Navbar from './components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusSquare, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faMinusSquare, faPlusSquare, faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

export default {
  name: 'App',
  components: { Navbar }
};
</script>

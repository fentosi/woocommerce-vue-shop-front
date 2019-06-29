<template>
  <div class="card float-left" style="width: 18rem;">
    <img :src="images[0].src" class="card-img-top" v-if="images" v-on:click="addToCart">
    <div class="card-body">
      <h5 class="card-title">{{name}}</h5>
      <p class="card-text" v-html="short_description"></p>
      <p class="card-text" v-html="price_html"></p>
      <button class="btn btn-primary" v-on:click="addToCart">Add to cart</button>
    </div>
  </div>
</template>

<style scoped>
  .card {
    margin: 1em 1em 0 0;
  }
  .card-title {
    height: 1.3em;
    overflow: hidden;
  }

  .card-text {
    height: 4.3em;
    overflow: hidden;
  }
</style>

<script>

import { ADD_ITEM_TO_CART } from '../store/mutationTypes';

export default {
  name: 'orderNewItem',
  props: {
    id: Number,
    name: String,
    type: String,
    short_description: String,
    price_html: String,
    images: Array,
    stock_quantity: Number
  },
  methods: {
    addToCart() {
      this.$store.commit(ADD_ITEM_TO_CART, {
        productId: this.id,
        variationId: null,
        quantity: 1
      });
    }
  }
};
</script>

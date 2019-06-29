<template>
  <div class="content">
    <h1>New Order</h1>
    <div class="row">
      <div class="col-md-8">
        <h3>Product items <button class="btn btn-secondary btn-sm" v-on:click="loadProducts">Refresh</button></h3>
        <template v-for="product in products">
          <order-new-item v-bind="product" v-bind:key="product.id" />
        </template>
      </div>
      <div class="col-md-4">
        <cart />
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_PRODUCTS } from '../store/actionTypes';
import { mapState } from 'vuex';
import OrderNewItem from '../components/OrderNewItem';
import Cart from '../components/Cart';

export default {
  name: 'orderNew',
  components: {
    OrderNewItem, Cart
  },
  computed: {
    ...mapState(['products'])
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      this.$store.dispatch(LOAD_PRODUCTS);
    }
  }
};
</script>

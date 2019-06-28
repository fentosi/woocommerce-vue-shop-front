<template>
  <div class="container">
    <h1>New Order</h1>
    <template v-for="product in products">
      <order-new-item v-bind="product" v-bind:key="product.id" />
    </template>
  </div>
</template>

<script>
import { LOAD_PRODUCTS } from '../store/actionTypes';
import { mapState } from 'vuex';
import OrderNewItem from '../components/OrderNewItem';

export default {
  name: 'orderNew',
  components: {
    OrderNewItem
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

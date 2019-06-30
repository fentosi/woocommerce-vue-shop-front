<template>
  <div class="content">
    <h1>New Order</h1>
    <div class="row">
      <div class="col-md-8">
        <h3>Product items <button class="btn btn-secondary btn-sm" v-on:click="loadProducts">Refresh</button></h3>
        <loader v-if="isLoading" />
        <div v-else-if="products.length > 0">
          <template v-for="product in products">
            <order-new-item v-bind="product" v-bind:key="product.id" />
          </template>
        </div>
        <div v-else>
          No available products
        </div>
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
import { SET_ERROR } from '../store/mutationTypes';
import Loader from '../components/Loader';

export default {
  name: 'orderNew',
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    OrderNewItem, Cart, Loader
  },
  computed: {
    ...mapState(['products'])
  },
  created() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(LOAD_PRODUCTS);
      } catch (e) {
        this.$store.commit(SET_ERROR, 'Something went wrong');
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<template>
  <div class="content">
    <h1>
      New Order
      <button class="btn btn-secondary btn-sm" v-on:click="loadProducts">Refresh</button>
    </h1>

    <div class="products-list">
      <h3>Product items <input type="text" placeholder="Search" v-model="searchTerm" /> </h3>
      <loader v-if="isLoading" />
      <div v-else-if="visibleProducts">
        <template v-for="product in visibleProducts">
          <order-new-item v-bind="product" v-bind:key="product.id" />
        </template>
      </div>
      <div v-else>
        No available products
      </div>
    </div>
    <div class="cart">
      <cart />
    </div>
  </div>
</template>

<style scoped>
  h3 input {
    float: right;
    font-size: 1.2rem;
    padding: 4px 2px;
  }

  .content {
    padding: 15px;
  }

  .products-list,
  .cart {
    position: absolute;
    overflow-x: auto;
    bottom: 0;
    top: 125px;
    padding: 15px;
  }

  .products-list {
    left: 0;
    width: 68%;
  }

  .cart {
    right: 0;
    width: 32%;
  }

  @media only screen and (max-width: 768px) {
    .products-list {
      width: 63%;
    }

    .cart {
      width: 40%;
    }
  }

  @media only screen and (max-width: 1024px) {
    .products-list {
      width: 69%;
    }
  }
</style>

<script>
import { LOAD_PRODUCTS } from '../store/actionTypes';
import OrderNewItem from '../components/OrderNewItem';
import Cart from '../components/Cart';
import { SET_ERROR } from '../store/mutationTypes';
import Loader from '../components/Loader';

export default {
  name: 'orderNew',
  data() {
    return {
      isLoading: false,
      searchTerm: ''
    };
  },
  components: {
    OrderNewItem, Cart, Loader
  },
  computed: {
    visibleProducts: function() {
      return this.$store.getters.productsBySearchTerm(this.searchTerm);
    }
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

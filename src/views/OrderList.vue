<template>
  <div class="orders-list container">
    <h1>Orders</h1>
    <loader v-if="isLoading" />
    <table class="table" v-else-if="orders.length > 0">
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Payment method</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
          <th>Paid</th>
        </tr>
      </thead>
      <template v-for="order in orders">
        <order-list-item v-bind="order" v-bind:key="order.id"></order-list-item>
      </template>
    </table>
    <div v-else>
      No orders
    </div>
  </div>
</template>

<script>
import OrderListItem from './OrderListItem';
import { LOAD_ORDERS } from '../store/actionTypes';
import { mapState } from 'vuex';
import Loader from '../components/Loader';
import { SET_ERROR } from '../store/mutationTypes';

export default {
  name: 'orderList',
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    OrderListItem, Loader
  },
  computed: {
    ...mapState(['orders'])
  },
  created() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(LOAD_ORDERS);
      } catch (e) {
        this.$store.commit(SET_ERROR, 'Something went wrong');
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<template>
  <div class="orders-list container">
    <h1>Orders</h1>
    <table class="table">
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
      <template v-for="order in orders">
        <order-list-item v-bind="order" v-bind:key="order.id"></order-list-item>
      </template>
      </thead>
    </table>
  </div>
</template>

<script>
import OrderListItem from './OrderListItem';
import { LOAD_ORDERS } from '../store/actionTypes';

export default {
  name: 'orderList',
  components: {
    OrderListItem
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  created() {
    this.loadOrders();
  },
  methods: {
    loadOrders() {
      this.$store.dispatch(LOAD_ORDERS);
    }
  }
};
</script>

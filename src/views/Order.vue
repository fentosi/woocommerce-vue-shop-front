<template>
  <div class="orders-list container" v-if="order">
    <h1>Order <small class="text-muted"># {{order.id}}</small></h1>
    <h3>Customer</h3>
    <p class="mb5">
      {{order.billing.first_name}} {{order.billing.last_name}}<br />
      {{order.billing.address_1}} {{order.billing.address_2}}<br />
      {{order.billing.city}} {{order.billing.state}}<br />
      {{order.billing.postcode}} {{order.billing.country}}<br />
    </p>
    <table class="table">
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
      <tr v-for="line_item in order.line_items" v-bind:key="line_item.id" class="line-item">
        <td>{{line_item.name}}</td>
        <td>{{line_item.quantity}}</td>
        <td>{{order.currency_symbol}}{{line_item.price}}</td>
        <td>{{order.currency_symbol}}{{line_item.total}}</td>
      </tr>
    </table>
    <p>
      <strong>Total: </strong>
      {{order.total}} {{order.currency}}
    </p>
  </div>
</template>

<script>
import { GET_ORDER } from '../store/actionTypes';

export default {
  name: 'order',
  data() {
    return {
      order: null
    };
  },
  created() {
    this.loadOrder();
  },
  methods: {
    async loadOrder() {
      this.order = await this.$store.dispatch(GET_ORDER, this.$route.params.id);
    }
  }
};
</script>

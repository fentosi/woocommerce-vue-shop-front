<template>
  <div>
    <loader v-if="isLoading" />
    <div class="orders-list container" v-else-if="order">
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
  </div>
</template>

<script>
import { GET_ORDER } from '../store/actionTypes';
import Loader from '../components/Loader';
import { SET_ERROR } from '../store/mutationTypes';

export default {
  name: 'order',
  components: {
    Loader
  },
  data() {
    return {
      order: null,
      isLoading: false
    };
  },
  created() {
    this.loadOrder();
  },
  methods: {
    async loadOrder() {
      this.isLoading = true;
      try {
        this.order = await this.$store.dispatch(GET_ORDER, this.$route.params.id);
      } catch (e) {
        this.$store.commit(SET_ERROR, 'Something went wrong');
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

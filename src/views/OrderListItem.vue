<template>
  <tr @click="redirectToOrder(id)" style="cursor: pointer">
    <td v-text="id" class="order-id" ></td>
    <td v-text="name" class="order-name"></td>
    <td v-text="payment_method_title" class="order-payment-method"></td>
    <td v-text="total" class="order-total"></td>
    <td v-text="status" class="order-status"></td>
    <td v-text="date_created_gmt" class="date-created"></td>
    <td v-text="date_paid_gmt" class="date-paid"></td>
  </tr>
</template>

<script>

export default {
  name: 'orderListItem',
  props: {
    id: Number,
    billing: Object,
    payment_method_title: String,
    total: String,
    status: String,
    date_created_gmt: String,
    date_paid_gmt: String
  },
  computed: {
    name() {
      return this.billing.first_name + ' ' + this.billing.last_name;
    }
  },
  methods: {
    redirectToOrder(orderID) {
      this.$router.push({ name: 'order', params: { id: orderID } });
    }
  }
};
</script>

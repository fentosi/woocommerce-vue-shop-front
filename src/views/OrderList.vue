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

export default {
  name: 'orderList',
  components: {
    OrderListItem
  },
  data () {
    return {
      orderData: [{
        id: 5468,
        status: 'cancelled',
        date_created_gmt: '2017-12-29T22:52:29',
        date_modified_gmt: '2017-12-29T22:52:29',
        total: '190',
        total_tax: '0',
        prices_include_tax: false,
        customer_id: 0,
        customer_note: '',
        billing: {
          first_name: 'kjjjjjjj',
          last_name: 'mlkmm',
          company: 'hhuhhu',
          address_1: 'Judaidah 2',
          address_2: 'j',
          city: 'Najaf',
          state: 'Najaf',
          postcode: '54001',
          country: 'IQ',
          email: 'husseinalmosawi10313abbas@gmail.com',
          phone: '07738078854'
        },
        shipping: {
          first_name: 'kjjjjjjj',
          last_name: 'mlkmm',
          company: 'hhuhhu',
          address_1: 'Judaidah 2',
          address_2: 'j',
          city: 'Najaf',
          state: 'Najaf',
          postcode: '54001',
          country: 'IQ'
        },
        payment_method_title: 'PayPal',
        date_paid_gmt: null,
        date_completed_gmt: null,
        currency_symbol: '$'
      },
      {
        id: 5572,
        status: 'on-hold',
        date_created_gmt: '2017-12-11T06:15:37',
        date_modified_gmt: '2017-12-11T06:15:37',
        total: '180',
        total_tax: '0',
        prices_include_tax: false,
        customer_note: '',
        billing: {
          first_name: 'John',
          last_name: 'Doe',
          company: '',
          address_1: '95 Wall Street',
          address_2: '#1722',
          city: 'New York',
          state: 'NY',
          postcode: '10003',
          country: 'US',
          email: 'evoqman+test@gmail.com',
          phone: '9166763643'
        },
        shipping: {
          first_name: 'John',
          last_name: 'Doe',
          company: '',
          address_1: '95 Wall Street',
          address_2: '#1722',
          city: 'New York',
          state: 'NY',
          postcode: '10003',
          country: 'US'
        },
        payment_method_title: 'Check Payments',
        date_paid_gmt: null,
        date_completed_gmt: null,
        currency_symbol: '$'
      }
      ]
    };
  },
  computed: {
    orders () {
      return this.orderData;
    }
  }
};
</script>

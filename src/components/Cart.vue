<template>
  <div>
    <h3>Cart</h3>
    <template v-for="cartItem in cartItems">
      <div class="row" v-bind:key="cartItem.id">
        <div class="col-sm-2">{{cartItem.quantity}} x</div>
        <div class="col-sm-6">{{cartItem.name}}</div>
        <div class="col-sm-4 text-right">{{cartItem.price}}</div>
      </div>
    </template>
    <br />
    <h4 class="text-right">Total: <small>{{totalPrice}}</small></h4>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'cart',
  computed: {
    ...mapState(['cart']),
    cartItems() {
      let itemsInCart = [];
      this.cart.forEach((item) => {
        const product = this.$store.getters.product(item.productId);

        itemsInCart.push({
          id: product.id,
          name: product.name,
          price: item.quantity * Number(product.price),
          quantity: item.quantity
        });
      });

      return itemsInCart;
    },
    totalPrice() {
      let total = 0;
      this.cartItems.forEach((item) => {
        total += item.price;
      });

      return Math.round(total * 100) / 100
    }
  }
};
</script>

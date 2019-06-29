<template>
  <div>
    <h3>Cart</h3>
    <div v-if="cartItems.length">
      <template v-for="cartItem in cartItems">
        <div class="row" v-bind:key="cartItem.id">
          <div class="col-sm-1">
            <font-awesome-icon icon="trash" size="lg" v-on:click="deleteItemFromCart(cartItem)" />
          </div>
          <div class="col-sm-2">{{cartItem.quantity}} x</div>
          <div class="col-sm-5">{{cartItem.name}}</div>
          <div class="col-sm-2 text-right">{{cartItem.price}}</div>
          <div class="col-sm-2">
            <font-awesome-icon icon="plus-square" size="2x" v-on:click="addItemToCart(cartItem)" />
            &nbsp;
            &nbsp;
            <font-awesome-icon icon="minus-square" size="2x" v-on:click="removeItemFromCart(cartItem)" />
          </div>
        </div>
      </template>
      <br />
      <h4 class="text-right">Total: <small>{{totalPrice}}</small></h4>
      <div class="row">
        <div class="col-sm-6">
          <button class="btn btn-secondary" v-on:click="clearCart">Clear</button>
        </div>
        <div class="col-sm-6"></div>
      </div>
    </div>
    <div v-else>
      Your cart is empty
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { ADD_ITEM_TO_CART, CLEAR_CART, DELETE_ITEM_FROM_CART, REMOVE_ITEM_FROM_CART } from '../store/mutationTypes';

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
          variationId: item.variationId,
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

      return Math.round(total * 100) / 100;
    }
  },
  methods: {
    addItemToCart(item) {
      this.$store.commit(ADD_ITEM_TO_CART, {
        productId: item.id,
        variationId: item.variationId,
        quantity: 1
      });
    },
    removeItemFromCart(item) {
      this.$store.commit(REMOVE_ITEM_FROM_CART, {
        productId: item.id,
        variationId: item.variationId
      });
    },
    deleteItemFromCart(item) {
      this.$store.commit(DELETE_ITEM_FROM_CART, {
        productId: item.id,
        variationId: item.variationId
      });
    },
    clearCart() {
      this.$store.commit(CLEAR_CART);
    }
  }
};
</script>

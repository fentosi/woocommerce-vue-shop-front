<template>
  <div>
    <h3>Cart</h3>
    <div v-if="cartItems.length">
      <div class="cart-row">
        <template v-for="cartItem in cartItems">
          <div class="cart-item" v-bind:key="cartItem.id">
            <div class="delete">
              <font-awesome-icon icon="trash" size="lg" v-on:click="deleteItemFromCart(cartItem)" />
            </div>
            <div class="quantity text-center">{{cartItem.quantity}}x</div>
            <div class="name">
              <div v-if="cartItem.variationData">
                {{cartItem.variationData.name}}
              </div>
              <div v-else>
                {{cartItem.name}}
              </div>
            </div>
            <div class="price text-right">{{cartItem.price}}</div>
            <div class="icons ">
              <font-awesome-icon icon="plus-square" size="2x" v-on:click="addItemToCart(cartItem)" />
              &nbsp;
              &nbsp;
              <font-awesome-icon icon="minus-square" size="2x" v-on:click="removeItemFromCart(cartItem)" />
            </div>
          </div>
        </template>
      </div>
      <br />
      <div class="cart-row">
        <h4 class="text-right">Total: <small>{{totalPrice}}</small></h4>
      </div>
      <div class="cart-row cart-buttons">
        <div>
          <button class="btn btn-secondary" v-on:click="clearCart">Clear</button>
        </div>
        <div>
          <button class="btn btn-primary submit" v-on:click="submitCart" :disabled="isSubmitting">Submit</button>
        </div>
      </div>
    </div>
    <div v-else>
      Your cart is empty
    </div>
  </div>
</template>

<style scoped>
  .cart-row {
    display: flex;
    flex-wrap: wrap;
  }

  .cart-item > div {
    float: left;
    padding-left: 5px;
    padding-right: 5px;
  }

  .cart-item > div:nth-of-type(1) {
    padding-left: 0;
  }

  .cart-item .delete {
    width: 25px;
  }

  .cart-item .quantity {
    width: 50px;
  }

  .cart-item .name {
    width: 40px;
  }

  .cart-item .price {
    width: 80px;
  }

  .cart-item .icons {
    width: 100px;
  }

  .cart-buttons {
    justify-content: space-between;
  }

  @media only screen and (max-width: 768px) {
    .cart-item .name {
      width: 100px;
    }
  }
</style>

<script>

import { mapState } from 'vuex';
import {
  ADD_ITEM_TO_CART,
  CLEAR_CART,
  DELETE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  SET_ERROR
} from '../store/mutationTypes';
import { createOrderData } from '../libs/createOrderData';
import ordersRepository from '../repositories/orders';

export default {
  name: 'cart',
  data() {
    return {
      isSubmitting: false
    };
  },
  computed: {
    ...mapState(['cart']),
    cartItems() {
      let itemsInCart = [];
      this.cart.forEach((item) => {
        const product = this.$store.getters.product(item.productId);
        const variationData = item.variationId ? this.$store.getters.variation(item.productId, item.variationId) : null;

        itemsInCart.push({
          id: product.id + (item.variationId ? '-' + item.variationId : ''),
          variationId: item.variationId,
          name: product.name,
          price: item.quantity * Number(product.price),
          quantity: item.quantity,
          variationData
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
    },
    async submitCart() {
      this.isSubmitting = true;
      try {
        await ordersRepository.create(createOrderData(this.cart));
        this.$store.commit(CLEAR_CART);
      } catch (e) {
        this.$store.commit(SET_ERROR, 'Something went wrong');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

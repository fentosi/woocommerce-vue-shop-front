<template>
  <div class="card float-left" style="width: 18rem;">
    <div class="image">
      <img :src="images[0].src" class="card-img-top" v-if="images.length > 0">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{name}}</h5>
      <p class="card-text" v-html="short_description" v-if="short_description"></p>
      <p class="card-text price" v-html="price_html" v-if="price_html"></p>
      <template v-if="variations.length">
        <popper
                trigger="click"
                :options="{
                placement: 'top',
                modifiers: { offset: { offset: '0,10px' } }}">
          <div class="popper">
            <div v-if="isVariationLoading">Loading</div>
            <ul v-for="variation in getVariations" v-bind:key="variation.id" class="list-group">
              <li class="list-group-item">
                <button
                        class="btn btn-primary"
                        v-on:click="addVariationToCart(variation.id, $event)"
                        v-bind:disabled="variation.stock == 0">
                  <font-awesome-icon icon="shopping-cart" />
                  &nbsp;
                  {{variation.name}} ({{variation.stock}})
                </button>
              </li>
            </ul>
          </div>
          <button class="btn btn-primary" slot="reference">
            <font-awesome-icon icon="shopping-cart" />
          </button>
        </popper>
      </template>
      <button class="btn btn-primary" v-on:click="addToCart" v-else>
        <font-awesome-icon icon="shopping-cart" />
        ({{stock_quantity}})
      </button>
    </div>
  </div>
</template>

<style scoped>
  .card {
    margin: 1em 1em 0 0;
  }

  .card .image {
    height: 18rem;
  }
  .card-title {
    height: 1.3em;
    overflow: hidden;
  }

  .card-text {
    height: 4.3em;
    overflow: hidden;
  }

  .card-text.price {
    height: auto;
  }

  .list-group-item {
    border: none;
  }

  @media only screen and (max-width: 1024px) {
    .card {
      width: 13rem !important;
    }

    .card .image {
      height: 13rem !important;
    }
  }
</style>

<script>

import { ADD_ITEM_TO_CART } from '../store/mutationTypes';
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  name: 'orderNewItem',
  components: {
    'popper': Popper
  },
  props: {
    id: Number,
    name: String,
    type: String,
    short_description: String,
    price_html: String,
    images: Array,
    stock_quantity: Number,
    variations: Array,
    variationsData: Array
  },
  computed: {
    isVariationLoading() {
      return this.$store.state.variationLoading[this.id] === true;
    },
    getVariations() {
      return this.$store.state.products[this.id].variationsData.map(variation => {
        return {
          id: variation.id,
          name: variation.attributes[0].name + ' - ' + variation.attributes[0].option,
          stock: variation.stock_quantity
        };
      });
    }
  },
  methods: {
    addToCart() {
      this.$store.commit(ADD_ITEM_TO_CART, {
        productId: this.id,
        variationId: null,
        quantity: 1
      });
    },
    addVariationToCart(variationId, $event) {
      this.$store.commit(ADD_ITEM_TO_CART, {
        productId: this.id,
        variationId: variationId,
        quantity: 1
      });

      let popperContainer = $event.path[4];
      popperContainer.style = 'display:none';
    }
  }
};
</script>

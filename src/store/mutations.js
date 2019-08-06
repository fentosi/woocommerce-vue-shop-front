import {
  ADD_ITEM_TO_CART,
  CLEAR_CART,
  DELETE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  SET_ERROR,
  SET_ORDERS,
  SET_PRODUCTS,
  SET_VARIATION,
  START_VARIATIONS_LOADING,
  STOP_VARIATIONS_LOADING,
  UNSET_ERROR
} from './mutationTypes';

const areCartItemsSame = (firstCartItem, secondCartItem) => firstCartItem.productId === secondCartItem.productId &&
  firstCartItem.variationId === secondCartItem.variationId;

export default {
  [SET_ORDERS](state, orders) {
    state.orders = orders;
  },

  [SET_PRODUCTS](state, products) {
    state.products = products;
  },

  [SET_ERROR](state, error) {
    state.error = error;
  },

  [UNSET_ERROR](state) {
    state.error = null;
  },

  [ADD_ITEM_TO_CART](state, { productId, variationId, quantity }) {
    let cartUpdated = false;
    const cartItem = {
      productId,
      variationId,
      quantity
    };

    state.cart.some((itemInCart) => {
      if (areCartItemsSame(itemInCart, cartItem)) {
        itemInCart.quantity += cartItem.quantity;
        cartUpdated = true;
      }

      return cartUpdated;
    });

    if (!cartUpdated) {
      state.cart.push({
        productId,
        variationId,
        quantity
      });
    }
  },

  [REMOVE_ITEM_FROM_CART](state, { productId, variationId }) {
    const cartItem = {
      productId,
      variationId
    };

    state.cart.some((itemInCart, index) => {
      if (areCartItemsSame(itemInCart, cartItem)) {
        itemInCart.quantity -= 1;

        if (itemInCart.quantity <= 0) {
          state.cart.splice(index, 1);
        }

        return true;
      }

      return false;
    });
  },

  [DELETE_ITEM_FROM_CART](state, { productId, variationId }) {
    const cartItem = {
      productId,
      variationId
    };

    state.cart.some((itemInCart, index) => {
      if (areCartItemsSame(itemInCart, cartItem)) {
        state.cart.splice(index, 1);

        return true;
      }

      return false;
    });
  },

  [CLEAR_CART](state) {
    state.cart = [];
  },

  [START_VARIATIONS_LOADING](state, productId) {
    state.variationLoading[productId] = true;
  },

  [STOP_VARIATIONS_LOADING](state, productId) {
    state.variationLoading[productId] = false;
  },

  [SET_VARIATION](state, variation) {
    const parentId = variation.parent_id;
    if (state.products.hasOwnProperty(parentId)) {
      state.products[parentId].variationsData.push(variation);
    } else {
      throw new Error('Could not find product for variation');
    }
  }
};

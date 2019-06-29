import { ADD_ITEM_TO_CART, SET_ORDERS, SET_PRODUCTS } from './mutationTypes';

const areCartItemsSame = (firstCartItem, secondCartItem) => firstCartItem.productId === secondCartItem.productId &&
  firstCartItem.variationId === secondCartItem.variationId;

export default {
  [SET_ORDERS](state, orders) {
    state.orders = orders;
  },

  [SET_PRODUCTS](state, products) {
    state.products = products;
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
  }
};

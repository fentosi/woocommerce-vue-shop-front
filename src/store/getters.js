export default {
  order: (state) => (orderID) => {
    let orders = state.orders.filter((order) => {
      return order.id === orderID;
    });

    if (orders.length) {
      return orders.pop();
    } else {
      return null;
    }
  },

  product: (state) => (productId) => {
    return state.products[productId];
  },

  productsBySearchTerm: (state) => (searchTerm) => {
    if (searchTerm && searchTerm.trim().length > 0) {
      let products = {};
      for (let [productId, product] of Object.entries(state.products)) {
        if (product.name.toLowerCase().indexOf(searchTerm) !== -1) {
          products[productId] = product;
        }
      }
      return products;
    }

    return state.products;
  },

  variation: (state) => (productId, variationId) => {
    let variation;
    const product = state.products[productId];

    if (product) {
      variation = product.variationsData.filter(variation => variation.id === variationId);

      variation = variation.length === 1 ? variation[0] : undefined;
    }

    return variation;
  }
};

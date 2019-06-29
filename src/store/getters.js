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
    let item = state.products.filter((product) => {
      return product.id === productId;
    });

    return item.pop();
  }
};

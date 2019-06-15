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
  }
};

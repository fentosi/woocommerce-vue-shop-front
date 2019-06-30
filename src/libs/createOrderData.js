export const createOrderData = (cart) => {
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    throw new Error('Cart is empty');
  }

  return {
    set_paid: true,
    line_items: cart
  };
};

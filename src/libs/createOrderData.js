export const createOrderData = (cart) => {
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    throw new Error('Cart is empty');
  }

  cart.forEach(cartItem => {
    if (!cartItem.variationId) {
      delete cartItem.variationId;
    }
  });

  return {
    set_paid: true,
    line_items: cart
  };
};

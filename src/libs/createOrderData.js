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
    payment_method: 'cod',
    payment_method_title: 'Cash on delivery',
    set_paid: true,
    line_items: cart
  };
};

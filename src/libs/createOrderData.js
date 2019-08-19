export const createOrderData = (cart) => {
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    throw new Error('Cart is empty');
  }

  const lineItems = cart.map(cartItem => {
    const lineItem = {
      product_id: cartItem.productId,
      quantity: cartItem.quantity
    };

    if (cartItem.variationId) {
      lineItem.variation_id = cartItem.variationId;
    }

    return lineItem;
  });

  return {
    payment_method: 'cod',
    payment_method_title: 'Cash on delivery',
    set_paid: true,
    line_items: lineItems
  };
};

export const addItemToCart = (cartItems, cartItemToAdd) => {

  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

  if (existingCartItem) {
    // Map will return us a new array, we need this in order for react to detect a change an re-render
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id ? {
        ...cartItem,
        quantity: cartItem.quantity + 1
      } : cartItem
    )
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, itemToRemove) =>
  cartItems.flatMap((item) => {
    return item.id !== itemToRemove.id
      ? item
      : item.quantity === 1
      ? []
      : { ...item, quantity: item.quantity - 1 };
  });
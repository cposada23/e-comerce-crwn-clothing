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
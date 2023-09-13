export const login = (userCredentials) => ({
  type: "LOGIN",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const addItemToCart = (itemId) => ({
  type: "ADD_ITEM_TO_CART",
  payload: itemId,
});

export const removeItemFromCart = (itemId) => ({
  type: "REMOVE_ITEM_FROM_CART",
  payload: itemId,
});

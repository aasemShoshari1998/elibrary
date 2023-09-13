const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: null,
        isLoading: true,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        user: null,
        isLoading: false,
      };

    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        user: {
          ...state.user,
          cartItems: [...state.user.cartItems, action.payload],
        },
      };
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        user: {
          ...state.user,
          cartItems: state.user.cartItems.filter(
            (item) => item !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;

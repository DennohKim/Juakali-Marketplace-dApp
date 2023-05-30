
import { useReducer, createContext } from "react";


//initial state
const initialState = {
  cart: {},
};

const ShoppingCartContext = createContext({});

function cartReducer(state, action) {

  switch (action.type) {
    case "ADD_TO_CART":
      const item = (state.cart[action.payload.product_title]);
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.product_title]: item
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : {
                ...action.payload,
                quantity: 1,
              },
        },
      };
    case "REMOVE_FROM_CART":
      let newCart = { ...state.cart };
      delete newCart[action.payload.product_title];
      return {
        ...state,
        cart: newCart,
      };
    default:
      return state;
  }
}

//context provider

const ShoppingCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <ShoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartProvider };

// import { useLocalStorage } from "@/hooks/useLocalStorage";
// import { createContext, useContext, useState } from "react";

// type ShoppingCartProviderProps = {
//   children: React.ReactNode;
// };

// type ShoppingCartContextType = {
//   getItemQuantity: (id: number) => number;
//   increaseCartQuantity: (id: number) => void;
//   decreaseCartQuantity: (id: number) => void;
//   removeFromCart: (id: number) => void;
//   cartQuantity: number;
//   cartItems: cartItem[];
// };

// type cartItem = {
//   id: number;
//   quantity: number;
// };

// const ShoppingCartContext = createContext({} as ShoppingCartContextType);

// export function useShoppingCart() {
//   return useContext(ShoppingCartContext);
// }

// export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
//   const [cartItems, setCartItems] = useLocalStorage<cartItem[]>(
//     "shopping-cart",
//     []
//   );

//   const cartQuantity = cartItems.reduce(
//     (quantity, item) => quantity + item.quantity,
//     0
//   );

//   function getItemQuantity(id: number) {
//     return cartItems.find((item) => item.id === id)?.quantity || 0;
//   }

//   function increaseCartQuantity(id: number) {
//     setCartItems((currItems) => {
//       if (currItems.find((item) => item.id === id) == null) {
//         return [...currItems, { id, quantity: 1 }];
//       } else {
//         return currItems.map((item) => {
//           if (item.id === id) {
//             return { ...item, quantity: item.quantity + 1 };
//           } else {
//             return item;
//           }
//         });
//       }
//     });
//   }

//   function decreaseCartQuantity(id: number) {
//     setCartItems((currItems) => {
//       if (currItems.find((item) => item.id === id)?.quantity === 1) {
//         return currItems.filter((item) => item.id !== id);
//       } else {
//         return currItems.map((item) => {
//           if (item.id === id) {
//             return { ...item, quantity: item.quantity - 1 };
//           } else {
//             return item;
//           }
//         });
//       }
//     });
//   }

//   function removeFromCart(id: number) {
//     setCartItems((currItems) => {
//       return currItems.filter((item) => item.id !== id);
//     });
//   }

//   return (
//     <ShoppingCartContext.Provider
//       value={{
//         getItemQuantity,
//         increaseCartQuantity,
//         decreaseCartQuantity,
//         removeFromCart,
//         cartItems,
//         cartQuantity,
//       }}
//     >
//       {children}
//     </ShoppingCartContext.Provider>
//   );
// }

import { useReducer, createContext } from "react";

//initial state
const initialState = {
  cart: {},
};

const ShoppingCartContext = createContext({});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.cart[action.payload.product_title];
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
      delete newCart[action.payload];
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

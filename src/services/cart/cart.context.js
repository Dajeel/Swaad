import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext({
  cart: [],
  restaurant: null,
  sum: 0,
  addToCart: () => {},
  clearCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  // Load cart from AsyncStorage when user logs in
  useEffect(() => {
    if (user?.uid) {
      (async () => {
        try {
          const stored = await AsyncStorage.getItem(`@cart-${user.uid}`);
          if (stored) {
            const { restaurant: rst, cart: crt } = JSON.parse(stored);
            setRestaurant(rst);
            setCart(crt);
          }
        } catch (e) {
          console.error("Failed to load cart:", e);
        }
      })();
    }
  }, [user]);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    if (user?.uid) {
      (async () => {
        try {
          const data = JSON.stringify({ restaurant, cart });
          await AsyncStorage.setItem(`@cart-${user.uid}`, data);
        } catch (e) {
          console.error("Failed to save cart:", e);
        }
      })();
    }
  }, [restaurant, cart, user]);

  // Calculate total sum in cents
  const sum = useMemo(() => {
    return cart.reduce((total, { price }) => total + price, 0);
  }, [cart]);

  const addToCart = useCallback(
    (item, rst) => {
      if (!restaurant || restaurant.placeId !== rst.placeId) {
        setRestaurant(rst);
        setCart([item]);
      } else {
        setCart((prev) => [...prev, item]);
      }
    },
    [restaurant]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    setRestaurant(null);
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, restaurant, sum, addToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

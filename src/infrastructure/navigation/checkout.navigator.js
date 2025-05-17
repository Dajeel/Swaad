import { createStackNavigator } from "@react-navigation/stack";

import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";

const Stack = createStackNavigator();

export const CheckoutNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccessScreen} />
    <Stack.Screen name="CheckoutError" component={CheckoutErrorScreen} />
  </Stack.Navigator>
);

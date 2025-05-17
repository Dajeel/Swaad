import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";

import { MapScreen } from "../../features/map/screens/map.screen";
import { CheckoutNavigator } from "./checkout.navigator";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";

import { CartContextProvider } from "../../services/cart/cart.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/restaurants/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }) => {
    let iconName;
    switch (route.name) {
      case "Restaurants":
        iconName = "restaurant";
        break;
      case "Checkout":
        iconName = "cash";
        break;
      case "Map":
        iconName = "map";
        break;
      case "Settings":
        iconName = "settings";
        break;
      default:
        iconName = "help";
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

/**
 * AppNavigator wraps the entire app in necessary context providers,
 * including StripeProvider for payments.
 * Publishable key is pulled from Expo config via expoConfig.
 */
export const AppNavigator = () => {
  const stripeKey =
    Constants.expoConfig?.extra?.stripePublishableKey ??
    process.env.STRIPE_PUBLISHABLE_KEY;

  return (
    <StripeProvider publishableKey={stripeKey}>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <CartContextProvider>
              <Tab.Navigator screenOptions={createScreenOptions}>
                <Tab.Screen
                  name="Restaurants"
                  component={RestaurantsNavigator}
                />
                <Tab.Screen name="Checkout" component={CheckoutNavigator} />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
              </Tab.Navigator>
            </CartContextProvider>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    </StripeProvider>
  );
};

import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { CartContext } from "../../../services/cart/cart.context";

import { payRequest } from "../..//../services/checkout/checkout.service";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import {
  CartIcon,
  CartIconContainer,
  ClearButton,
  NameInput,
  PayButton,
  PaymentProcessing,
} from "../components/checkout.styles";
import { CreditCardInput } from "../components/credit-card.component";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, clearCart, sum } = useContext(CartContext);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = async () => {
    setIsLoading(true);
    if (!token || !token.id) {
      setIsLoading(false);
      navigation.navigate("CheckoutError", {
        error: "Please fill in a valid credit card",
      });
      return;
    }
    try {
      await payRequest(token.id, sum, name);
      clearCart();
      navigation.navigate("CheckoutSuccess");
    } catch (err) {
      navigation.navigate("CheckoutError", { error: err.message || err });
    } finally {
      setIsLoading(false);
    }
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }) => (
              <List.Item key={item} title={`${item} - ${price / 100}`} />
            ))}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>

        <NameInput label="Name" value={name} onChangeText={setName} />

        <Spacer position="top" size="large">
          {name.length > 0 && (
            <CreditCardInput
              name={name}
              onSuccess={setToken}
              onError={() =>
                navigation.navigate("CheckoutError", {
                  error: "Something went wrong processing your credit card",
                })
              }
            />
          )}
        </Spacer>

        <Spacer position="top" size="xxl" />

        <PayButton
          disabled={isLoading}
          icon="cash"
          mode="contained"
          onPress={onPay}
        >
          Pay
        </PayButton>

        <Spacer position="top" size="large">
          <ClearButton
            disabled={isLoading}
            icon="cart-off"
            mode="contained"
            onPress={clearCart}
          >
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};

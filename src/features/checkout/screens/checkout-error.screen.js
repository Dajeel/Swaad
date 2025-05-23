import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { CartIcon, CartIconContainer } from "../components/checkout.styles";

/**
 * Displays an error message when checkout fails.
 * Accepts a string or Error object in route.params.error.
 */
export const CheckoutErrorScreen = ({ route }) => {
  const { error = "" } = route.params;
  const message = typeof error === "string" ? error : error.message;

  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <Text variant="label">{message}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};

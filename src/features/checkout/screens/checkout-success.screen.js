import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartIcon, CartIconContainer } from "../components/checkout.styles";

/**
 * Confirmation screen displayed after successful payment.
 */
export const CheckoutSuccessScreen = () => (
  <SafeArea>
    <CartIconContainer>
      <CartIcon icon="check-bold" />
      <Text variant="label">Payment Successful!</Text>
    </CartIconContainer>
  </SafeArea>
);

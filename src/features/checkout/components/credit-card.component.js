import { CardField, useStripe } from "@stripe/stripe-react-native";

/**
 * CreditCardInput component updated to use @stripe/stripe-react-native
 * - Replaces react-native-credit-card-input
 * - Uses native CardField and createToken API
 *
 * Note: Ensure your app is wrapped in <StripeProvider publishableKey={YOUR_KEY}>
 * and, if using Expo, you have a custom dev client with stripe-react-native plugin.
 */
export const CreditCardInput = ({ name, onSuccess, onError }) => {
  const { createToken } = useStripe();

  const handleCardDetailsChange = async (cardDetails) => {
    // Only attempt tokenization when card details are complete
    if (cardDetails.complete) {
      try {
        const { token, error } = await createToken({
          type: "Card",
          name,
        });

        if (error) {
          console.error("Stripe token error:", error);
          onError(error);
        } else {
          // Send token back to parent for server-side processing
          onSuccess(token);
        }
      } catch (err) {
        console.error("Unexpected tokenization error:", err);
        onError(err);
      }
    }
  };

  return (
    <CardField
      postalCodeEnabled
      placeholder={{ number: "4242 4242 4242 4242" }}
      cardStyle={{
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
      }}
      style={{
        width: "100%",
        height: 50,
        marginVertical: 20,
      }}
      onCardChange={handleCardDetailsChange}
    />
  );
};

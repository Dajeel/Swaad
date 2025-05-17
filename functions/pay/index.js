// pay.js — Updated Stripe payment handler
// Expects JSON POST body: { tokenId, amount, name }

module.exports.payRequest = async (req, res, stripeClient) => {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { tokenId, amount, name } = req.body;

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: { token: tokenId },
      },
      confirmation_method: "automatic",
      confirm: true,
      metadata: name ? { name } : {},
    });

    return res.json(paymentIntent);
  } catch (error) {
    console.error("Stripe payment error:", error);
    return res.status(400).json({ error: error.message });
  }
};

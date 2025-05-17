// checkout.service.js — payment service for Expo app

const host = "https://pay-jgnc7743uq-uc.a.run.app";

/**
 * payRequest
 * @param {string} tokenId - Stripe token ID from createToken
 * @param {number} amount - Amount in cents to charge
 * @param {string} name - Customer name (optional metadata)
 * @returns {Promise<Object>} - Response JSON from backend
 */
export const payRequest = async (tokenId, amount, name) => {
  try {
    const response = await fetch(host, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId, name, amount }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || "Something went wrong processing your payment"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("payRequest error:", error);
    throw error;
  }
};

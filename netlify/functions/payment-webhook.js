// netlify/functions/payment-webhook.js
// Automated payment gateway listener for Netlify
const crypto = require("crypto");

exports.handler = async (event) => {
  // Only accept POST requests from payment gateway
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || "zapba01cec93a38464289af82199a29c7c9";
    const signature = event.headers["x-razorpay-signature"];

    // Validate signature authenticity
    if (signature) {
      const expected = crypto
        .createHmac("sha256", webhookSecret)
        .update(event.body)
        .digest("hex");

      if (signature !== expected) {
        return { statusCode: 400, body: "Invalid signature verification" };
      }
    }

    const payload = JSON.parse(event.body);
    console.log("Feasto Payment Webhook Event Received:", payload.event);

    // Return 200 OK so the payment gateway marks delivery as complete
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "success", received: true })
    };
  } catch (err) {
    console.error("Webhook processing error:", err);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};

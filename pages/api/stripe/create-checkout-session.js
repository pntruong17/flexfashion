//import stripe from "@/lib/stripe-client";
import { getProductId } from "@/utils/callback";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const { currency, items, success_url, cancel_url, email } = req.body;

    const getProduct = async (id) => {
      const productId = await getProductId(id);
      const { description, image, title, price } = productId;

      return {
        currency,
        unit_amount: price * 100,
        product_data: {
          description: description,
          name: title,
          images: [image],
        },
      };
    };

    const line_items = await Promise.all(
      items.map(async (item) => ({
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        price_data: await getProduct(item.productId),
        quantity: item.quantity,
      }))
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${success_url}/cancel-checkout`,
      cancel_url: `${cancel_url}/success`,
      metadata: {
        email,
      },
    });

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({
      message: "There was a problem creating the Stripe Checkout session",
    });
  }
};

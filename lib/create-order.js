import stripe from "@/lib/stripe-client";
const sessionId = "sessionId";

async function createOrder({ sessionId }) {
  const { customer, line_items, ...session } =
    await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product", "customer"],
    });

  return await hygraphMutationClient.request(createOrderMutation, {
    order: {
      email: customer.email,
      total: session.amount_total,
      stripeCheckoutId: session.id,
      orderItems: {
        create: line_items.data.map((item) => ({
          quantity: item.quantity,
          total: item.amount_total,
          product: {
            connect: {
              id: item.price.product.metadata.productId,
            },
          },
        })),
      },
    },
  });
}

export default createOrder;

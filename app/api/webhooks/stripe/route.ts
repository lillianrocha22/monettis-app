import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
  
 
    switch (event.type) {
      case "invoice.paid": {

        // Atualizar o usuário com o seu novo plano
        const { customer, lines } = event.data.object;

        // Acessar o metadata e subscription ID diretamente do line item
        const lineItem = lines.data[0] as any;
        const clerkUserId = lineItem?.metadata?.clerk_user_id;
        const subscriptionId = lineItem?.parent?.subscription_item_details?.subscription;

        if (!clerkUserId) {
          return new NextResponse('User ID is required', { status: 400 });
        }
        try {
          await clerkClient().users.updateUserMetadata(clerkUserId, {
            privateMetadata: {
              stripeCustomerId: customer,
              stripeSubscriptionId: subscriptionId,
            },
            publicMetadata: {
              subscriptionPlan: "premium",
            },
          });
        } catch (error) {
          return new NextResponse('Internal Server Error', { status: 403 });
        }
        break;
      }
      case "customer.subscription.deleted": {
        // Remover plano premium do usuário
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.id,
        );
        const clerkUserId = subscription.metadata.clerk_user_id;
        if (!clerkUserId) {
          return NextResponse.error();
        }
        await clerkClient().users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: null,
            stripeSubscriptionId: null,
          },
          publicMetadata: {
            subscriptionPlan: null,
          },
        });
      }

    }

  
  return NextResponse.json({ received: true });
};
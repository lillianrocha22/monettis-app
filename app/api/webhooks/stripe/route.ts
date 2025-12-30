import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing Stripe environment variables");
    return NextResponse.json(
      { error: "Webhook configuration error" },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    console.error("Missing stripe-signature header");
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "invoice.paid": {
        // Atualizar o usuário com o seu novo plano
        const { customer, lines } = event.data.object;

        // Acessar o metadata e subscription ID diretamente do line item
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lineItem = lines.data[0] as any;

        if (!lineItem) {
          console.error("No line items found in invoice");
          return NextResponse.json(
            { error: "No line items in invoice" },
            { status: 400 }
          );
        }

        const clerkUserId = lineItem?.metadata?.clerk_user_id;
        const subscriptionId = lineItem?.parent?.subscription_item_details?.subscription;

        if (!clerkUserId) {
          console.error("No clerk_user_id found in line item metadata");
          return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
          );
        }
        await clerkClient().users.updateUserMetadata(clerkUserId, {
            privateMetadata: {
              stripeCustomerId: customer,
              stripeSubscriptionId: subscriptionId,
            },
            publicMetadata: {
              subscriptionPlan: "premium",
            },
        });
        
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
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
};
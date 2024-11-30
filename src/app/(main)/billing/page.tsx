import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { formatDate } from "date-fns";

import prisma from "@/lib/db";
import stripe from "@/lib/stripe";
import { GetSubscriptionButton } from "./_components/get-subscription-button";
import { ManageSubscriptionButton } from "./_components/manage-subscription-button";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function BillingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan :{" "}
        <span className="font-semibold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription ends on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}

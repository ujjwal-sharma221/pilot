import { cache } from "react";

import { SubscriptionType } from "./types/subscription-type";
import prisma from "./db";
import { env } from "@/env";

export const getUserSubscriptionPlan = cache(
  async (userId: string): Promise<SubscriptionType> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });
    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "free";
    }

    if (
      subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ) {
      return "pro";
    }

    if (
      subscription.stripePriceId ===
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
    ) {
      return "pro_plus";
    }

    throw new Error("Invalid subscription plan");
  },
);

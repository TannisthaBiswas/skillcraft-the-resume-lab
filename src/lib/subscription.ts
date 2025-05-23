import { env } from "@/env";
import { cache } from "react";
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "elite" | "prime";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "free";
    }

    if (
      subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ) {
      return "elite";
    }

    if (
      subscription.stripePriceId ===
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
    ) {
      return "prime";
    }

    throw new Error("Invalid subscription");
  },
);
// export const getUserSubscriptionLevel = cache(
//   async (): Promise<SubscriptionLevel> => {
//     return "prime";
//   }
// );

import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Stripe from "stripe";
import GetSubscriptionButton from "./GetSubscriptionButton";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

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
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-xl shadow-2xl mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Your Billing Hub
        </h1>
        <p className="text-lg font-light text-purple-200">
          Manage your subscription and unlock new possibilities.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Current Plan</h2>
        <p className="text-xl text-gray-700">
          You are currently on the{" "}
          <span className="font-extrabold text-purple-600">
            {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
          </span>{" "}
          plan.
        </p>
        <div className="mt-6 flex justify-center">
          {subscription ? (
            <>
              {subscription.stripeCancelAtPeriodEnd && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md w-full max-w-md mx-auto mb-4">
                  <p>
                    <span className="font-bold">Heads up:</span> Your subscription will be
                    canceled on{" "}
                    <span className="font-semibold">
                      {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
                    </span>.
                  </p>
                </div>
              )}
              <ManageSubscriptionButton />
            </>
          ) : (
            <GetSubscriptionButton />
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mt-8">
        <div className="flex-1 p-6 bg-purple-50 rounded-lg shadow-inner flex flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-purple-500 mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l1.45 4.38L18 8l-4.55 3.62L12 16l-1.45-4.38L6 8l4.55-3.62L12 2z" />
            <path d="M18 10l-6 6-6-6" />
          </svg>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Upgrade for More</h3>
          <p className="text-sm text-gray-600">
            Elevate your experience with premium features and enhanced capabilities.
          </p>
        </div>
        <div className="flex-1 p-6 bg-purple-50 rounded-lg shadow-inner flex flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500 mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Seamless & Secure</h3>
          <p className="text-sm text-gray-600">
            All your payments are processed with top-tier security and peace of mind.
          </p>
        </div>
        <div className="flex-1 p-6 bg-purple-50 rounded-lg shadow-inner flex flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-purple-500 mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8h1a4 4 0 010 8h-1M2 8h1a4 4 0 000 8h-1M12 8v8m-4-8v8m8-8v8" />
          </svg>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Community & Support</h3>
          <p className="text-sm text-gray-600">
            Join a vibrant community and get priority support whenever you need it.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/" passHref>
          <button className="px-8 py-4 bg-purple-600 text-white font-extrabold rounded-full shadow-xl hover:bg-purple-700 transition-colors transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300">
            Back to Home
          </button>
        </Link>
      </div>
    </main>
  );
}
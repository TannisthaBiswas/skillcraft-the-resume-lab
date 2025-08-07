// components/PricingSection.tsx
"use client";

import { DollarSign, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { env } from "@/env";
import { createCheckoutSession } from "./actions";
import { useToast } from "@/hooks/use-toast";

export default function PricingSection() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handlePremiumClick(priceId: string) {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full py-16 px-5 bg-gray-100">
      <div className="container mx-auto text-center space-y-6">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-800">
          Choose Your Trajectory
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Select the plan that aligns with your ambition. Unlock advanced features and accelerate your career journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {/* Basic Ascent Card (Free) */}
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <DollarSign className="h-10 w-10 text-emerald-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Free Tier</h3>
            <p className="text-gray-600 mb-4">Perfect for getting started.</p>
            <p className="text-4xl font-extrabold text-purple-700 mb-6">₹0<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="text-gray-700 text-left space-y-2 mb-6">
              <li>✓ Standard Templates</li>
              <li>✓ Real-time Preview</li>
              <li>✓ PDF Export</li>
            </ul>
            <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
              <Link href="/resumes">Launch Your Ascent</Link>
            </Button>
          </div>

          {/* Elite Tier Card */}
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl border-2 border-purple-500 transform hover:scale-105 transition-transform duration-300 relative">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Most Popular</div>
            <Sparkles className="h-10 w-10 text-violet-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Elite Tier</h3>
            <p className="text-gray-600 mb-4">Unlock your full potential.</p>
            <p className="text-4xl font-extrabold text-purple-700 mb-6">₹1000<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="text-gray-700 text-left space-y-2 mb-6">
              <li>✓ AI Assistance</li>
              <li>✓ Up to 3 Resumes</li>
              <li>✓ Multiple Resume Templates</li>
              <li>✓ Custom Colors</li>
            </ul>
            <Button
              onClick={() => handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY)}
              disabled={loading}
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
            >
              Go Elite
            </Button>
          </div>

          {/* Prime Tier Card */}
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <ShieldCheck className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Prime Tier</h3>
            <p className="text-gray-600 mb-4">For ultimate career domination.</p>
            <p className="text-4xl font-extrabold text-purple-700 mb-6">₹2000<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="text-gray-700 text-left space-y-2 mb-6">
              <li>✓ All Elite Features</li>
              <li>✓ Unlimited Resumes</li>
              <li>✓ ATS Score Check</li>
              <li>✓ AI Cover Letter Generation</li>
            </ul>
            <Button
              onClick={() => handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY)}
              disabled={loading}
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
            >
              Go Prime
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { env } from "@/env";
import { useToast } from "@/hooks/use-toast";
import usePremiumModal from "@/hooks/usePremiumModal";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createCheckoutSession } from "./actions";

const premiumFeatures = ["AI assiatance", "Up to three resumes", "Multiple Resume templates", "Custom colours"];
const premiumPlusFeatures = ["All Elite Features","Unlimited resumes", "ATS score", "Cover letter generation", ];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

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
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Subscribe</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a subscription for elevated access.</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Elite</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
                  )
                }
                disabled={loading}
              >
                Get Elite
              </Button>
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-center text-lg font-bold text-transparent">
                Prime
              </h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="premium"
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
                  )
                }
                disabled={loading}
              >
                Get Prime
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  PremiumFeatures,
  PremiumPlusFeatures,
} from "@/constants/premium-features";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";
import { createCheckoutSession } from "@/actions/stripe.checkout.action";

export function PremiumModal() {
  const { open, setOpen } = usePremiumModal();
  const [loading, setLoading] = useState(false);

  const handlePremiumClick = async (priceId: string) => {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) setOpen(open);
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold">Pilot Pro</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Upgrade to a premium subscription to unlock all the features</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-semibold">Premium</h3>
              <ul className="list-inside space-y-2">
                {PremiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <BadgeCheck className="size-4" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                disabled={loading}
                onClick={() =>
                  handlePremiumClick(
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!,
                  )
                }
                className="bg-black"
                variant="gooeyLeft"
              >
                Get Premium
              </Button>
            </div>
            <div className="mx-6 border-l"></div>
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-center text-lg font-semibold text-transparent">
                Premium Plus
              </h3>
              <ul className="list-inside space-y-2">
                {PremiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <BadgeCheck className="size-4" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                disabled={loading}
                onClick={() =>
                  handlePremiumClick(
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!,
                  )
                }
                variant="gooeyLeft"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
              >
                Get Premium Plus
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

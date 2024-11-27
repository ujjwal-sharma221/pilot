"use client";

import { BadgeCheck } from "lucide-react";

import {
  PremiumFeatures,
  PremiumPlusFeatures,
} from "@/constants/premium-features";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";

export function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <Button className="bg-black" variant="gooeyLeft">
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

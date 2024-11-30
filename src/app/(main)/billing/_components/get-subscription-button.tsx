"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";

export function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();
  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
      variant="gooeyRight"
    >
      Get Premium Subscription
    </Button>
  );
}

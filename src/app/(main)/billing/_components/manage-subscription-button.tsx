"use client";

import { useState } from "react";
import { toast } from "sonner";

import { LoadingButton } from "@/components/loading-button";
import { CreateCustomerPortalSession } from "@/actions/manage.subscription.action";

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const redirectUrl = await CreateCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      Manage Subscription
    </LoadingButton>
  );
}

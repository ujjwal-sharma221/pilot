"use client";

import { createContext, useContext } from "react";

import { SubscriptionType } from "@/lib/types/subscription-type";

interface SubscriptonPlanProviderProps {
  children: React.ReactNode;
  userSubscription: SubscriptionType;
}

const SubscriptionLPlanContext = createContext<SubscriptionType | undefined>(
  undefined,
);

const SubscriptonPlanProvider = ({
  children,
  userSubscription,
}: SubscriptonPlanProviderProps) => {
  return (
    <SubscriptionLPlanContext.Provider value={userSubscription}>
      {children}
    </SubscriptionLPlanContext.Provider>
  );
};

export function useSubscriptionPlan() {
  const context = useContext(SubscriptionLPlanContext);
  if (context === undefined) {
    throw new Error(
      "useSubscriptionPlan must be used within a SubscriptionPlanProvider",
    );
  }

  return context;
}

export default SubscriptonPlanProvider;

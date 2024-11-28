import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { PremiumModal } from "@/components/premium-modal";
import { Navbar } from "./_components/navbar";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import SubscriptonPlanProvider from "@/providers/subscripton-plan-provider";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const subscriptionPlan = await getUserSubscriptionPlan(userId);

  return (
    <SubscriptonPlanProvider userSubscription={subscriptionPlan}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <PremiumModal />
      </div>
    </SubscriptonPlanProvider>
  );
};

export default MainLayout;

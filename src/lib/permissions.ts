import { SubscriptionType } from "./types/subscription-type";

export function canCreateResume(
  subscriptionType: SubscriptionType,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionType, number> = {
    free: 1,
    pro: 2,
    pro_plus: Infinity,
  };

  const maxResumes = maxResumeMap[subscriptionType];

  return currentResumeCount < maxResumes;
}

export function enableAITools(subscriptionType: SubscriptionType) {
  return subscriptionType !== "free";
}

export function enableCustomisations(subscriptionType: SubscriptionType) {
  return subscriptionType === "pro_plus";
}

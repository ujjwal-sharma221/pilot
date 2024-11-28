import { useState } from "react";
import { Sparkle } from "lucide-react";
import { toast } from "sonner";

import { ResumeValues } from "@/lib/schemas/validatio-schema";
import { LoadingButton } from "@/components/loading-button";
import { generateSummary } from "@/actions/generate.summary.actions";
import { useSubscriptionPlan } from "@/providers/subscripton-plan-provider";
import usePremiumModal from "@/hooks/use-premium-modal";
import { enableAITools } from "@/lib/permissions";

interface GenerateSummarButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerate: (summary: string) => void;
}

export function GenerateSummaryButton({
  resumeData,
  onSummaryGenerate,
}: GenerateSummarButtonProps) {
  const [loading, setLoading] = useState(false);
  const subscriptionType = useSubscriptionPlan();
  const premiumModal = usePremiumModal();

  const handleClick = async () => {
    if (!enableAITools(subscriptionType)) {
      premiumModal.setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const aiRes = await generateSummary(resumeData);
      onSummaryGenerate(aiRes);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <Sparkle className="size-4" />
      Generate a summary
    </LoadingButton>
  );
}

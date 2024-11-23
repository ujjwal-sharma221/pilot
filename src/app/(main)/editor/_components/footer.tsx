import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Steps } from "./steps";
import { FileUser, PenLineIcon } from "lucide-react";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showResumePreview: boolean;
  setShowResumePreview: (show: boolean) => void;
}

export function Footer({
  currentStep,
  setCurrentStep,
  setShowResumePreview,
  showResumePreview,
}: FooterProps) {
  const previousStep = Steps.find(
    (_, index) => Steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = Steps.find(
    (_, index) => Steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="sticky bottom-0 w-full bg-white px-3 py-5 shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous Step
          </Button>
          <Button
            variant="shine"
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next Step
          </Button>
        </div>
        <Button
          onClick={() => setShowResumePreview(!showResumePreview)}
          variant="outline"
          size="icon"
          className="md:hidden"
          title={showResumePreview ? "Show Input Form" : "Show Resume Preview"}
        >
          {showResumePreview ? (
            <PenLineIcon className="text-muted-foreground" />
          ) : (
            <FileUser className="text-muted-foreground" />
          )}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="font-mono text-sm text-muted-foreground opacity-0">
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
}

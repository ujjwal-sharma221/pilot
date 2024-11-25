"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Spotlight } from "@/components/spotlight";
import { Steps } from "./steps";
import FormBreadcrumbs from "./form-breadcrumbs";
import { Footer } from "./footer";
import { ResumeValues } from "@/lib/schemas/validatio-schema";
import { ResumePreviewSection } from "./resume-preview-section";
import { cn, mapToResumeValues } from "@/lib/utils";
import { useAutoSaveResume } from "./use-autosave-resume";
import { useUnloadWarning } from "@/hooks/use-unload-warning";
import { ResumeServerData } from "@/lib/types/db-types";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || Steps[0].key;

  const values = resumeToEdit ? mapToResumeValues(resumeToEdit) : {};

  const [resumeData, setResumeData] = useState<ResumeValues>(values);
  const [resumePreview, setShowResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const FormComponent = Steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex items-center justify-center rounded-b border-b border-zinc-100 bg-white p-6">
        <Spotlight
          className="from-blue-800 via-blue-600 to-blue-400 blur-xl dark:from-blue-900 dark:via-blue-500 dark:to-blue-900"
          size={65}
        />
        <header className="space-y-2 px-3 text-center">
          <h1 className="text-2xl font-bold capitalize">design your resume</h1>
          <p className="text-sm text-muted-foreground">
            Follow the given steps to create your resume. Your progress is saved
            automatically
          </p>
        </header>
      </div>

      <main className="relative flex-grow">
        <div className="absolute inset-0 flex p-2">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto md:block md:w-1/2",
              resumePreview && "hidden",
            )}
          >
            <FormBreadcrumbs
              currentStep={currentStep}
              setCurrentStep={setStep}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r"></div>
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(resumePreview && "flex")}
          />
        </div>
      </main>

      <Footer
        isSaving={isSaving}
        currentStep={currentStep}
        setCurrentStep={setStep}
        showResumePreview={resumePreview}
        setShowResumePreview={setShowResumePreview}
      />
    </div>
  );
}

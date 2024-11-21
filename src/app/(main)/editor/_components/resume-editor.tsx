"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Spotlight } from "@/components/spotlight";
import { cn } from "@/lib/utils";
import { Steps } from "./steps";
import FormBreadcrumbs from "./form-breadcrumbs";
import { Footer } from "./footer";
import { ResumeValues } from "@/lib/schemas/validatio-schema";

export function ResumeEditor() {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || Steps[0].key;

  const [resumeData, setResumeData] = useState<ResumeValues>({});

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
          <div className="w-full space-y-6 overflow-y-auto md:w-1/2">
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
          <div className="hidden w-1/2 md:flex">
            <pre>{JSON.stringify(resumeData, null, 2)}</pre>
          </div>
        </div>
      </main>

      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}

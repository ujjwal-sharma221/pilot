import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useDebounce } from "@/hooks/use-debounce";
import { ResumeValues } from "@/lib/schemas/validatio-schema";
import { saveResume } from "@/actions/save.action";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

export function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [resumeId, setResumeId] = useState(resumeData.id);
  const [isError, setIsError] = useState(false);

  useEffect(() => setIsError(false), [debouncedResumeData]);

  useEffect(() => {
    const save = async () => {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        const udpdatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(udpdatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== udpdatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", udpdatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        toast.error(
          <div className="flex items-center gap-2">
            <p>Could not save changes</p>
            <Button
              variant="secondary"
              onClick={() => {
                save();
              }}
            >
              Retry
            </Button>
          </div>,
        );
      } finally {
        setIsSaving(false);
      }
    };

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError)
      save();
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    resumeId,
    searchParams,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}

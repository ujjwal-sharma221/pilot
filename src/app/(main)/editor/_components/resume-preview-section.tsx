import { ResumePreview } from "@/components/resume-preview";
import { ResumeValues } from "@/lib/schemas/validatio-schema";
import { ColorPicker } from "./color-picker";
import { BorderStyleButton } from "./border-style-button";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

export function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  return (
    <div className={cn("relative hidden w-full md:flex md:w-1/2", className)}>
      <div className="absolute -top-3 left-0 z-50 flex flex-none flex-col gap-3 lg:left-2 lg:top-1">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-zinc-50">
        <ResumePreview resumeData={resumeData} className="max-w-2xl shadow" />
      </div>
    </div>
  );
}

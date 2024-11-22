import { ResumePreview } from "@/components/resume-preview";
import { ResumeValues } from "@/lib/schemas/validatio-schema";
import { ColorPicker } from "./color-picker";
import { BorderStyleButton } from "./border-style-button";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="relative hidden w-1/2 md:flex">
      <div className="absolute left-1 top-1 z-50 flex flex-none flex-col gap-3 lg:left-2 lg:top-1">
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

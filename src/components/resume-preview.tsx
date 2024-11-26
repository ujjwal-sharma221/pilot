import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";

import { ResumeValues } from "@/lib/schemas/validatio-schema";
import { cn } from "@/lib/utils";
import { UseDimension } from "@/hooks/use-dimension";
import { BorderTrail } from "./border-trail";
import { Badge } from "./ui/badge";
import { BorderStyles } from "@/app/(main)/editor/_components/border-style-button";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export function ResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = UseDimension(containerRef);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[210/297] h-fit w-full overflow-hidden rounded-md bg-white text-black outline-none",
        className,
      )}
    >
      <BorderTrail
        className="bg-gradient-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700"
        size={250}
      />
      <div
        style={{ zoom: (1 / 794) * width }}
        className={cn("space-y-6 p-6", !width && "invisible")}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <h1 className="p-6 text-3xl">
          <PersonalInfoHeader resumeData={resumeData} />
          <SummarySection resumeData={resumeData} />
          <WorkExperienceSection resumeData={resumeData} />
          <EducationSection resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
        </h1>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    phone,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    photo,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";

    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="author-photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}

      <div className="space-y-2.5">
        <div className="space-y-1">
          <p style={{ color: colorHex }} className="text-3xl font-extrabold">
            {firstName} {lastName}
          </p>
          <p>{jobTitle}</p>
        </div>
        <p className="text-xs text-zinc-700">
          {city}
          {city && country ? "," : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Proffessional Profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperience, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperience?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );
  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Work Experiences</p>
        <div className="whitespace-pre-line text-sm">
          {workExperiencesNotEmpty.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid space-y-1">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{exp.position}</span>
                <span>
                  {exp.startDate && (
                    <span>
                      {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                      {exp.endDate
                        ? formatDate(exp.endDate, "MM/yyyy")
                        : "Present"}
                    </span>
                  )}
                </span>
              </div>
              <p className="text-xs font-semibold">{exp.company}</p>
              <div className="whitespace-pre-line text-xs">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationNotEmpty = educations?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );
  if (!educationNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Education</p>
        <div className="whitespace-pre-line text-sm">
          {educationNotEmpty.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid space-y-1">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{edu.degree}</span>
                <span>
                  {edu.startDate && (
                    <span>
                      {formatDate(
                        edu.startDate,
                        `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? ` - ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`,
                      )}
                    </span>
                  )}
                </span>
              </div>
              <p className="text-xs font-semibold">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Skills</p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <Badge
              style={{
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
              className="bg-[#424242] text-[#F5F5F5]"
              key={idx}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}

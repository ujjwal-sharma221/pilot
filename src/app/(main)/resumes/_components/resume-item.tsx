"use client";

import Link from "next/link";
import { formatDate } from "date-fns";

import { ResumeServerData } from "@/lib/types/db-types";
import { ResumePreview } from "@/components/resume-preview";
import { mapToResumeValues } from "@/lib/utils";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export function ResumeItem({ resume }: ResumeItemProps) {
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group rounded-lg border border-transparent bg-zinc-50 p-3 transition-colors hover:border-zinc-200">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-bold">
            ({resume.title || "Untitled"})
          </p>
          {resume.description ? (
            <p className="line-clamp-2 text-xs">{resume.description}</p>
          ) : null}
          <p className="mt-2 text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created on"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden transition-shadow group-hover:shadow-md"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700" />
        </Link>
      </div>
    </div>
  );
}

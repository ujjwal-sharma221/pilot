import { Metadata } from "next";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

import { ResumeEditor } from "./_components/resume-editor";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { resumeDataInclude } from "@/lib/types/db-types";

interface EditorPageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};

const EditorPage = async ({ searchParams }: EditorPageProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { resumeId } = await searchParams;

  const resumeToEdit = resumeId
    ? await prisma.resume.findFirst({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return (
    <div>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <LoaderCircle className="animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ResumeEditor resumeToEdit={resumeToEdit} />
      </Suspense>
    </div>
  );
};

export default EditorPage;

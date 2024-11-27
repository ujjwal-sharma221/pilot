import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/db";
import { resumeDataInclude } from "@/lib/types/db-types";
import { ResumeItem } from "./_components/resume-item";
import { CreateResumeButton } from "./_components/create-resume-button";

export const metadata: Metadata = {
  title: "Your resumes",
};

const ResumePage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton canCreate={false} />
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Your Resumes</h1>
        <p>({totalCount})</p>
      </div>
      <div className="sm:grid-col-2 grid w-full gap-3 md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((res) => (
          <ResumeItem key={res.id} resume={res} />
        ))}
      </div>
    </main>
  );
};

export default ResumePage;

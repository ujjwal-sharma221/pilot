import { Metadata } from "next";
import Link from "next/link";
import { FilePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Your resumes",
};

const ResumePage = async () => {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button className="mx-auto flex w-fit gap-2" asChild variant="gooeyLeft">
        <Link href="/editor">
          <FilePlus className="size-5" />
          New Resume
        </Link>
      </Button>
    </main>
  );
};

export default ResumePage;

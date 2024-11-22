import { Metadata } from "next";
import { Suspense } from "react";

import { ResumeEditor } from "./_components/resume-editor";
import { LoaderCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Design your resume",
};

const EditorPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <LoaderCircle className="animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ResumeEditor />
      </Suspense>
    </div>
  );
};

export default EditorPage;

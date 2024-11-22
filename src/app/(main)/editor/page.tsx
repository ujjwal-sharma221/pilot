import { Metadata } from "next";
import { Suspense } from "react";

import { ResumeEditor } from "./_components/resume-editor";

export const metadata: Metadata = {
  title: "Design your resume",
};

const EditorPage = () => {
  return (
    <div>
      <Suspense>
        <ResumeEditor />
      </Suspense>
    </div>
  );
};

export default EditorPage;

import { Metadata } from "next";

import { ResumeEditor } from "./_components/resume-editor";

export const metadata: Metadata = {
  title: "Design your resume",
};

const EditorPage = () => {
  return (
    <div>
      <ResumeEditor />
    </div>
  );
};

export default EditorPage;

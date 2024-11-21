import { ResumeValues } from "../schemas/validatio-schema";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

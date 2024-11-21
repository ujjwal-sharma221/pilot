import { EditorFormProps } from "@/lib/types/form-types";
import { GeneralInfoForm } from "./forms/general-info-form";
import { PersonalInfoForm } from "./forms/personal-info-form";

export const Steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General Info", component: GeneralInfoForm, key: "genral-info" },
  {
    title: "Personal Info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
];
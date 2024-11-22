import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export const peronsalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less then 4MB",
    ),
  firstName: optionalString,
  lastName: optionalString,
  location: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export const workExperienceSchema = z.object({
  workExperience: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export const summarySchema = z.object({
  summary: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;
export type PersonalInfoValues = z.infer<typeof peronsalInfoSchema>;
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;
export type EducationValues = z.infer<typeof educationSchema>;
export type SkillsValus = z.infer<typeof skillsSchema>;
export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...educationSchema.shape,
  ...generalInfoSchema.shape,
  ...peronsalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

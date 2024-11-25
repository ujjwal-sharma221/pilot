import { z } from "zod";

import {
  educationSchema,
  optionalString,
  skillsSchema,
  workExperienceSchema,
} from "./validatio-schema";

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;

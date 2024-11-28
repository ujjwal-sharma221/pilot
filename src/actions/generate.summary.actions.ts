"use server";

import { auth } from "@clerk/nextjs/server";

import openAI from "@/lib/openai";
import {
  GenerateSummaryInput,
  generateSummarySchema,
} from "@/lib/schemas/Ai-schema";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { enableAITools } from "@/lib/permissions";

export async function generateSummary(input: GenerateSummaryInput) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const subscriptionType = await getUserSubscriptionPlan(userId);
  if (!enableAITools(subscriptionType))
    throw new Error("AI tools not allowed for this tier");

  const { jobTitle, workExperience, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
  You are resume generator AI assistant. Your task is to generate a professional introduction summary from the provided data.
  Only return the summary, no other text. Keep it concise and to the point.
  `;

  const userMessage = `
  Here is the data you will use to generate a resume summary:
  Job Title: ${jobTitle || "N/A"}
  Work Experience: ${workExperience
    ?.map(
      (
        exp,
      ) => `Position: ${exp.position || "N/A"} at company ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
    `,
    )
    .join("\n\n")}
  Education: ${educations
    ?.map(
      (
        edu,
      ) => `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
    `,
    )
    .join("\n\n")}
  Skills: ${skills?.join(", ") || "N/A"}
  `;

  console.log("system message", systemMessage);
  console.log("user message", userMessage);

  const completion = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0].message.content;
  if (!aiResponse) throw new Error("Failed to generate ai response");

  return aiResponse;
}

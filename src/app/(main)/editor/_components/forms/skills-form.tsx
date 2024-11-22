import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { skillsSchema, SkillsValus } from "@/lib/schemas/validatio-schema";
import { EditorFormProps } from "@/lib/types/form-types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function SkillsForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<SkillsValus>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-sm text-muted-foreground">Add your skills</p>
      </div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Skills</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="eg React.Js, Graphic Design, Next.js etc..."
                  onChange={(e) => {
                    const skills = e.target.value.split(",");
                    field.onChange(skills);
                  }}
                />
              </FormControl>
              <FormDescription>
                You can add multiple values, separated by &quot;,&quot;
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}

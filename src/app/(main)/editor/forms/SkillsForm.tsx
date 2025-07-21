import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues, Skill } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { XCircle } from "lucide-react";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      // Explicitly ensure 'name' is string and 'proficiency' is number for initial form state
      skills:
        resumeData.skills?.map((skillItem) => ({
          // Using non-null assertion '!' here if you are absolutely sure mapToResumeValues
          // guarantees non-null/undefined skill objects coming from resumeData.skills
          // Otherwise, you might need a temporary 'any' cast like skillItem: any
          name: skillItem.name || "",
          proficiency: skillItem.proficiency ?? 3,
        })) || [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      // Trigger validation to ensure all skill names are present and valid
      await form.trigger(); // No need to store isValid if you always proceed with cleanedSkills

      // Rigorously clean and type-ensure the skills array before passing to setResumeData
      const cleanedSkills = (values.skills || []) // Ensure it's an array to start
        .filter((skill): skill is Skill => {
          // This type guard makes sure 'skill' is not null/undefined for subsequent operations
          return skill !== null && skill !== undefined;
        })
        .map((skill) => {
          // Now 'skill' is definitely not null/undefined, but its properties might be optional
          // Ensure name is a string before trimming
          const name = typeof skill.name === 'string' ? skill.name.trim() : '';
          // Ensure proficiency is a number
          const proficiency = typeof skill.proficiency === 'number' ? skill.proficiency : 3;

          return { name, proficiency };
        })
        .filter(skill => skill.name !== ''); // Finally, filter out skills with empty names


      setResumeData({
        ...resumeData,
        skills: cleanedSkills,
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">What are you good at?</p>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-3">
              <FormField
                control={form.control}
                name={`skills.${index}.name`}
                render={({ field: skillNameField }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className={index === 0 ? "" : "sr-only"}>
                      Skill Name
                    </FormLabel>
                    <FormControl>
                      <Input {...skillNameField} placeholder="e.g. React.js" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`skills.${index}.proficiency`}
                render={({ field: proficiencyField }) => (
                  <FormItem className="w-24">
                    <FormLabel className={index === 0 ? "" : "sr-only"}>
                      Proficiency
                    </FormLabel>
                    <Select
                      onValueChange={(value) =>
                        proficiencyField.onChange(Number(value))
                      }
                      value={String(proficiencyField.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Proficiency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} Star{num !== 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
                className="mb-2"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "", proficiency: 3 })}
            className="w-full"
          >
            Add Skill
          </Button>
          <FormDescription>
            Add and rate your skills. You can add as many as you like.
          </FormDescription>
        </form>
      </Form>
    </div>
  );
}
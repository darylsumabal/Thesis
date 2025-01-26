import { z } from "zod";

export const pointBasedSchema = z.object({
  evaluationCriterion: z
    .string()
    .min(1, { message: "Please enter a criterion" }),
  score: z
    .number()
    .min(1, {
      message: "Score must be between 0 and 100",
    })
    .max(100, { message: "Score must be between 0 and 100" }),
});

const judgesSchema = z.object({
  id: z.number(),
});

export const formSchema = z.object({
  criteria: z.array(pointBasedSchema),
  judges: z.array(judgesSchema),
});

export type FormValues = z.infer<typeof formSchema>;

export const multipleRoundSchema = z.object({
  evaluationCriterion: z
    .string()
    .min(1, { message: "Please enter a criterion" }),
  score: z
    .number()
    .min(1, {
      message: "Score must be between 0 and 100",
    })
    .max(100, { message: "Score must be between 0 and 100" }),
});

export const Schema = z.object({
  judges: z.array(judgesSchema),
  multiple: z.object({
    criteria: z.array(
      z.object({
        round: z.number(),
        criterion: z.array(multipleRoundSchema),
      })
    ),
  }),
});

export type MultipleRound = z.infer<typeof Schema>;

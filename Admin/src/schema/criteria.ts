import { z } from "zod";

const criteria = z.object({
  judges_id: z.number(),
  participant_id: z.number(),
  contest_id: z.number(),
  group_id: z.string(),
});

export const pointBasedSchema = z.object({
  criteria: z.array(
    criteria.merge(
      z.object({
        // judges_id: z.number(),
        // participant_id: z.number(),
        // contest_id: z.number(),
        // group_id: z.string(),
        // evaluationCriterion: z.string(),
        evaluation_criteria: z.string(),
        score: z.number().min(1, {
          message: "Score must be minimum of 1",
        }),
      })
    )
  ),
});

export type PointBasedCriteria = z.infer<typeof pointBasedSchema>;

export const multipleBasedSchema = z.object({
  criteria: z.array(
    criteria.merge(
      z.object({
        evaluation_criteria: z.string(),
        score: z.number().min(1, {
          message: "Score must be minimum of 1",
        }),
        round: z.number(),
      })
    )
  ),
});

export type MultipleBasedCriteria = z.infer<typeof multipleBasedSchema>;

export const editCriteriaSchema = z.object({
  evaluation_criteria: z.string().min(1, {
    message: "Please enter a criteria",
  }),
});

type EditAccountDefaultValues = {
  evaluation_criteria: string;
};

export const editCriteriaDefaultValue: EditAccountDefaultValues = {
  evaluation_criteria: "",
};

// criteria: [{ evaluationCriterion: "", score: 0 }],

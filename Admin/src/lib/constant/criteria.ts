import { Field } from "@/components/Card";

type CriteriaScore = {
  judges_id: number;
  contest_id: number;
  group_id: string;
  evaluationCriterion: string;
  score: number;
};

type Particpant = {
  participant_id: number;
};

export type test = {
  evaluation_criteria: string;
};

export type JudginScore = {
  criteria: CriteriaScore[];
  participant: Particpant;
};

export const EditCriteria: Field[] = [
  {
    label: "Edit Criteria",
    inputType: "text",
  },
];

export const editFieldCriteria = {
  "Edit Criteria": "evaluation_criteria",
} as const;

// console.log(data);

// mutateAsync({ criteria: data });
// console.log({ criteria: data });
// form.reset();

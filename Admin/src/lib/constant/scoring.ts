import { Scoring } from "@/services/api/scoring/scoring";
export const judges = [
  {
    id: "judge1",
    label: "Michael Smith",
  },
  {
    id: "judge2",
    label: "Sarah Johnson",
  },
  {
    id: "judge3",
    label: "William Brown",
  },
  {
    id: "judge4",
    label: "Emma Davis",
  },
  {
    id: "judge5",
    label: "James Miller",
  },
  {
    id: "judge6",
    label: "Olivia Wilson",
  },
  {
    id: "judge7",
    label: "David Moore",
  },
  {
    id: "judge8",
    label: "Sophia Taylor",
  },
  {
    id: "judge9",
    label: "Christopher Anderson",
  },
  {
    id: "judge10",
    label: "Isabella Martinez",
  },
];

type ScoringField<T, R = string> = {
  label: string;
  value: (item: T) => R;
};


export const SCORING_FIELDS: ScoringField<Scoring>[] = [
  {
    label: "Contest Name",
    value: (item) => item.contest_name,
  },
  {
    label: "Contest Description",
    value: (item) => item.contest_description,
  },
  {
    label: "Head Organizer",
    value: (item) => item.event.organizer,
  },
  {
    label: "Contest Venue",
    value: (item) => item.contest_venue,
  },
  {
    label: "Scoring Type",
    value: (item) => item.contest_scoring_type,
  },
];

type Criteria = {
  evaluationCriterion: string;
  score: number;
};

type Judges = {
  id: number;
};

export type ScoringDataPointBased = {
  criteria: Criteria[];
  judges: Judges[];
};

type RoundCriteria = {
  round: number;
  criterion: Criteria[];
};

type Multiple = {
  criteria: RoundCriteria[];
};

export type ScoringDataMultipleRound = {
  judges: Judges[];
  multiple: Multiple;
};

// const updatedJudges = selectedJudges.includes(value)
//   ? selectedJudges.filter((item) => item !== value)
//   : [...selectedJudges, value];

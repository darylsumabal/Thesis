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
    label: "Head Oraganizer",
    value: (item) => item.event.organizer,
  },
  {
    label: "Contest Venue",
    value: (item) => item.contest_venue,
  },
];

type CRITERIA = {
  evaluationCriterion: string;
  score: number;
};

type JUDGES = {
  id: number;
};

export type SCORINGDATA = {
  criteria: CRITERIA[];
  judges: JUDGES[];
};




// const updatedJudges = selectedJudges.includes(value)
//   ? selectedJudges.filter((item) => item !== value)
//   : [...selectedJudges, value];

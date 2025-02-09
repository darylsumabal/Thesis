import { axiosClient } from "@/services/api/AxiosClient";
import { Contest } from "../contest/contest";

export type Criterion = {
  id: string;
  group_id: string;
  evaluation_criteria: string;
  score: number;
  round?: number;
  contest_id: number;
};
type Criteria = {
  id: number;
  evaluation_criteria: string;
  score: number;
  round: number;
};

type MultipleCriterion = {
  round: number;
  criteria: Criteria[];
};

type Judges = {
  id: number;
  group_ud: string;
  judge_id: number;
  contest_id: number;
};

export interface CriteriaInfo {
  id: number;
  contest_id: number;
  group_id: string;
  judges: Judges[];
  contest: Contest;
}

type Score = {
  judges_id: number | null;
  contest_id: number | null;
  group_id: string;
  evaluation_criteria: string;
  score: number;
  round?: number;
};

export type MultipleScore = {
  criteria: Score[];
};

export type JudgingScore = {
  criteria: Score[];
};

// export type Participants = {
//   id: number | null;
//   first_name: number | null;
//   last_name: string;
//   description: string;
//   age: string;
//   gender: string;
//   poster_url: string;
//   contest_id: number;
// };

export interface PointBasedCriteria extends CriteriaInfo {
  criteria: Criterion[];
}

export interface MultipleRoundCriteria extends CriteriaInfo {
  criteriaMultipleRound: MultipleCriterion[];
}

export const getPointBasedCriteria = async (group_id: string) => {
  const response = await axiosClient.get(`/contest/${group_id}/scores`);
  const { data } = response;
  const { scores } = data;

  return scores;
};

export const getMultipleBasedCriteria = async (groupId: string) => {
  const response = await axiosClient.get(
    `contest/${groupId}/scores/multiple-round`
  );
  const { data } = response;
  const { scores } = data;
  return scores;
};

export const showScoreCriteria = async () => {
  const response = await axiosClient.get("/contest/criteria-list/scores");
  const { data } = response;
  const { criteria_list } = data;
  return criteria_list;
};

export const addScoreJudging = async (data: JudgingScore, judgeId: number) => {
  return await axiosClient.post(
    `/criteria/judge/${judgeId}/judging-scores`,
    data
  );
};

export const addScoreMultipleJudging = async (
  data: MultipleScore,
  judgeId: number
) => {
  return await axiosClient.post(
    `/criteria/judge/${judgeId}/judging-score/multiple-based`,
    data
  );
};

export const showParticipant = async (contest_id: number) => {
  const response = await axiosClient.get(
    `criteria/contest/${contest_id}/judging-score`
  );
  const { data } = response;
  const { participants } = data;
  return participants;
};

export const editCriteria = async (evaluation_criteria: string, id: string) => {
  return await axiosClient.put(`criteria/${id}/edit`, {
    evaluation_criteria: evaluation_criteria,
  });
};

export const editMultipleBasedCriteria = async (
  evaluation_criteria: string,
  id: number
) => {
  return await axiosClient.put(`criteria/${id}/edit/multiple-round`, {
    evaluation_criteria: evaluation_criteria,
  });
};

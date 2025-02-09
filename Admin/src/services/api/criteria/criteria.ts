import { axiosClient } from "@/services/api/AxiosClient";

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

export type a = {
  round: number;
  criteria: Criteria[];
};

type Judges = {
  id: number;
  group_ud: string;
  judge_id: number;
  contest_id: number;
};

type Contest = {
  id: number;
  contest_name: string;
  contest_description: string;
  contest_scoring_type: string;
  contest_venue: string;
  contest_poster: string;
  event_id: number;
  event: {
    name: string;
    organizer: string;
  };
};

export interface CriteriaInfo {
  id: number;
  contest_id: number;
  group_id: string;
  judges: Judges[];
  contest: Contest;
}

export interface PointBasedCriteria extends CriteriaInfo {
  criteria: Criterion[];
}

export interface MultipleRoundCriteria extends CriteriaInfo {
  criteriaMultipleRound: a[];
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

export type judgingScore = {
  criteria: Score[];
};

export type Participants = {
  id: number | null;
  first_name: number | null;
  last_name: string;
  description: string;
  age: string;
  gender: string;
  poster_url: string;
  contest_id: number;
};

export const addScoreJudging = async (data: judgingScore, judgeId: number) => {
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

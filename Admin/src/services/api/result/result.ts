import { axiosClient } from "../AxiosClient";

export type Participant = {
  id: number;
  age: string;
  first_name: string;
  last_name: string;
  gender: string;
  poster_url: string;
};

export type OverAllScore = {
  id: string;
  score: string;
};

export type Score = {
  participant: Participant;
  total_scores: { [key: string]: string };
  overall_scores: OverAllScore;
};

export const showResult = async (contest_id: number, group_id: string) => {
  const response = await axiosClient.get(
    `result/contest/${contest_id}/${group_id}`
  );

  const { data } = response;

  if (data.message) {
    console.log("message ni");
    return [];
  } else {
    const { results } = data;
    console.log(results);
    return results;
  }
};

export const showResultMultiple = async (
  contest_id: number,
  group_id: string
) => {
  const response = await axiosClient.get(
    `result/contest/multiple/${contest_id}/${group_id}`
  );

  const { data } = response;

  const { results } = data;
  console.log(results);
  return results;
};

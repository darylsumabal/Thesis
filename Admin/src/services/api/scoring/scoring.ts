import { axiosClient } from "../AxiosClient";
import { SCORINGDATA } from "../../../lib/constant/scoring";

export type Scoring = {
  id: number;
  contest_name: string;
  contest_description: string;
  contest_scoring_type: string;
  contest_venue: string;
  contest_poster: string;
  event: {
    name: string;
    organizer: string;
  };
};

export type JudgesData = {
  id: number;
  name: string;
};

export const getScoring = async (scoringType: string) => {
  const response = await axiosClient.get("/scoring", {
    params: {
      scoringType: scoringType,
    },
  });
  const { data } = response;
  const { contest } = data;
  return contest;
};

export const getJudges = async () => {
  const response = await axiosClient.get("/contest/judges");
  const { data } = response;
  const { judges } = data;
  return judges;
};

export const createCriteria = async (id: number, data: SCORINGDATA) => {
  return await axiosClient.post(`/contest/${id}/create-criteria`, data);
};

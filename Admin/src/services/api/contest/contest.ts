import { axiosClient } from "../AxiosClient";

export type Contest = {
  id: string;
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

export const getContest = async () => {
  const response = await axiosClient.get("contest");
  const { data } = response;
  const { contest } = data;
  return contest;
};

export const addParticipants = async (data: FormData, id: string) => {
  return await axiosClient.post(`contest/${id}/add-participant`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addTeamParticipants = async (data: FormData, id: string) => {
  return await axiosClient.post(`contest/${id}/add-team-participant`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const destroyContest = async (id: string) => {
  return await axiosClient.post(`contest/${id}`);
};

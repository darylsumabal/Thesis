import { axiosClient } from "../AxiosClient";

export type Events = {
  id: string;
  name: string;
  description: string;
  date: string;
  organizer: string;
  venue: string;
  poster: string;
};

export const addEvent = async (data: FormData) => {
  return await axiosClient.post("events", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getEvent = async () => {
  const response = await axiosClient.get("events");
  const { data } = response;
  const { events } = data;
  return events;
};

export const deleteEvent = async (id: string) => {
  return await axiosClient.post(`events/${id}`);
};

export const addContest = async (data: FormData, id: string) => {
  console.log("contest", data);
  return await axiosClient.post(`events/${id}/contest`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

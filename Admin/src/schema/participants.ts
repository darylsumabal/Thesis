import z from "zod";

export const addParticipantSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter a first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter a last name",
  }),
  description: z.string().min(1, {
    message: "Please enter a description",
  }),
  age: z
    .string()
    .min(1, {
      message: "Please enter a age",
    })
    .max(120, {
      message: "Age must be less than 120",
    }),
  gender: z.string().min(1, {
    message: "Please enter a gender",
  }),
  image: z.string(),
});

type DefaultValuesParticipants = {
  firstName: string;
  lastName: string;
  description: string;
  age: string;
  gender: string;
  image: string;
};

export const defaultValuesParticipants: DefaultValuesParticipants = {
  firstName: "",
  lastName: "",
  description: "",
  age: "",
  gender: "",
  image: "",
};

export const addTeamParticipantSchema = z.object({
  teamName: z.string().min(1, {
    message: "Please enter a team name",
  }),
  teamDescription: z.string().min(1, {
    message: "Please enter a team description",
  }),
  teamCaptain: z.string().min(1, {
    message: "Please enter a team captain",
  }),
});

type DefaultValuesTeamsParticipant = {
  teamName: string;
  teamDescription: string;
  teamCaptain: string;
};

export const defaultValuesTeamsParticipant: DefaultValuesTeamsParticipant = {
  teamName: "",
  teamDescription: "",
  teamCaptain: "",
};

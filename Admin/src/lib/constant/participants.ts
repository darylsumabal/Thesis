import { Field } from "@/components/Card";

export const fieldsParticipant: Field[] = [
  {
    label: "FIRST NAME",
    inputType: "text",
  },
  {
    label: "LAST NAME",
    inputType: "text",
  },
  {
    label: "DESCRIPTION",
    inputType: "text",
  },
  {
    label: "AGE",
    inputType: "text",
  },
  {
    label: "GENDER",
    inputType: "text",
  },
  {
    label: "IMAGE",
    inputType: "file",
  },
];

export const fieldNamesParticipant = {
  "FIRST NAME": "firstName",
  "LAST NAME": "lastName",
  DESCRIPTION: "description",
  AGE: "age",
  GENDER: "gender",
  IMAGE: "image",
} as const;

export const fieldTeamsParticipant: Field[] = [
  {
    label: "TEAM NAME",
    inputType: "text",
  },
  {
    label: "TEAM DESCRIPTION",
    inputType: "text",
  },
  {
    label: "TEAM CAPTAIN",
    inputType: "text",
  },
];

export const fieldNamesTeamsParticipant = {
  "TEAM NAME": "teamName",
  "TEAM DESCRIPTION": "teamDescription",
  "TEAM CAPTAIN": "teamCaptain",
} as const;

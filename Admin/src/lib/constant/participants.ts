import { Field } from "@/components/Card";

export const FIELD_PARTICIPANT: Field[] = [
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

export const FIELD_NAME_PARTICIPANT = {
  "FIRST NAME": "firstName",
  "LAST NAME": "lastName",
  DESCRIPTION: "description",
  AGE: "age",
  GENDER: "gender",
  IMAGE: "image",
} as const;

export const FIELD_TEAM_PARTICIPANT: Field[] = [
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

export const FIELD_NAME_TEAM_PARTICIPANT = {
  "TEAM NAME": "teamName",
  "TEAM DESCRIPTION": "teamDescription",
  "TEAM CAPTAIN": "teamCaptain",
} as const;

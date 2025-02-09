import { Field } from "@/components/Card";
import { ComboboxData } from "@/components/Combobox";

export const ADD_ACCOUNT: Field[] = [
  {
    label: "NAME",
    inputType: "text",
  },
  {
    label: "EMAIL",
    inputType: "text",
  },
  {
    label: "ACCOUNT TYPE",
    inputType: "combobox",
  },
  {
    label: "PASSWORD",
    inputType: "password",
  },
  {
    label: "PASSWORD CONFIRMATION",
    inputType: "password",
  },
];

export const EDIT_ACCOUNT: Field[] = [
  {
    label: "PASSWORD",
    inputType: "password",
  },
  {
    label: "PASSWORD CONFIRMATION",
    inputType: "password",
  },
];

export const FIELD_EDIT_ACCOUNT = {
  PASSWORD: "password",
  "PASSWORD CONFIRMATION": "password_confirmation",
} as const;

export const FIELD_NAME_ADD_ACCOUNT = {
  NAME: "name",
  EMAIL: "email",
  "ACCOUNT TYPE": "accountType",
  PASSWORD: "password",
  "PASSWORD CONFIRMATION": "password_confirmation",
} as const;

export const COMBOBOX_INPUT_ACCOUNT_TYPE: ComboboxData[] = [
  {
    label: "SELECT",
    value: "",
  },
  {
    label: "JUDGE",
    value: "JUDGE",
  },
  {
    label: "ORGANIZER",
    value: "ORGANIZER",
  },
];

import { Field } from "@/components/Card";
import { ComboboxData } from "@/components/Combobox";

export const addAccount: Field[] = [
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

export const editAccount: Field[] = [
  {
    label: "PASSWORD",
    inputType: "password",
  },
  {
    label: "PASSWORD CONFIRMATION",
    inputType: "password",
  },
];

export const fieldEditAccount = {
  PASSWORD: "password",
  "PASSWORD CONFIRMATION": "password_confirmation",
} as const;

export const fieldNameAddAccount = {
  NAME: "name",
  EMAIL: "email",
  "ACCOUNT TYPE": "accountType",
  PASSWORD: "password",
  "PASSWORD CONFIRMATION": "password_confirmation",
} as const;

export const comboboxInputAccountType: ComboboxData[] = [
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

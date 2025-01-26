import { z } from "zod";

export const addAccountSchema = z
  .object({
    name: z.string().min(1, {
      message: "Please enter a name",
    }),
    email: z.string().email().min(1, {
      message: "Please enter a valid email address",
    }),
    accountType: z.string().min(1, {
      message: "Please select account type",
    }),
    password: z.string().min(6, {
      message: "Please must be at least 6 character",
    }),
    password_confirmation: z.string().min(6, {
      message: "Please must be at least 6 character",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password and cofirm password does not match",
    path: ["password_confirmation"],
  });

export const editAccountSchema = z
  .object({
    password: z.string().refine((value) => value.length > 0, {
      message: "Password must be at least 6 character",
    }),
    password_confirmation: z.string().refine((value) => value.length > 0, {
      message: "Password must be at least 6 character",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password and cofirm password does not match",
    path: ["password_confirmation"],
  });

type EditAccountDefaultValues = {
  password: string;
  password_confirmation: string;
};

export const editAccountDefualtValue: EditAccountDefaultValues = {
  password: "",
  password_confirmation: "",
};

type DefaultValuesAccount = {
  name: string;
  email: string;
  accountType: string;
  password: string;
  password_confirmation: string;
};

export const defaultValues: DefaultValuesAccount = {
  name: "",
  email: "",
  accountType: "",
  password: "",
  password_confirmation: "",
};

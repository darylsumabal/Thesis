import { axiosClient } from "../AxiosClient";

export type Account = {
  id: string;
  name: string;
  email: string;
  accountType: string;
};

export type AccountType = {
  account: Account[];
};

export const createAccount = async (data: FormData) => {
  if (data) {
    axiosClient.post("accounts", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const showAccount = async () => {
  const response = await axiosClient.get("accounts");
  const { data } = response;
  return data;
};

export const deleteAccount = async (id: string) => {
  return await axiosClient.post(`accounts/${id}`);
};

export const editAccount = async (data: FormData, id: string) => {
  return await axiosClient.post(`account/${id}/update`, data);
};

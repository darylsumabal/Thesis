import { LoginSchema, RegisterSchema } from "@/schema";
import { z } from "zod";
import { axiosClient } from "../AxiosClient";
import { useContextUser } from "@/lib/context/ContextProvider";
import { useNavigate } from "react-router-dom";

export type UserType = {
  name: string;
  email: string;
};

const Authentication = () => {
  const { setToken } = useContextUser();
  const navigate = useNavigate();

  const userMe = async (): Promise<UserType> => {
    const response = await axiosClient.get("/me");
    const { data } = response;
    const { user } = data;

    return user;
  };

  const onLogin = async (data: z.infer<typeof LoginSchema>) => {
    const response = await axiosClient.post("/login", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        
      },
    });
    const { access_token } = response.data;
    setToken(access_token);
  };

  const onRegister = async (data: z.infer<typeof RegisterSchema>) => {
    if (data) {
      axiosClient.post("register", data);
      console.log(data);
    }
  };

  const onLogOut = async () => {
    try {
      navigate("/login");
      await axiosClient.post("/logout");
      localStorage.removeItem("ACCESS_TOKEN");
    } catch (error) {
      console.log(error);
    }
  };

  return { userMe, onLogin, onRegister, onLogOut };
};

export default Authentication;

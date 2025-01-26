import Authentication, { UserType } from "@/services/api/auth/authentication";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../../schema/index";

export const useGetUser = () => {
  const { userMe } = Authentication();
  return useQuery<UserType>({
    queryKey: ["user"],
    queryFn: userMe,
  });
};

export const useLogin = () => {
  const { onLogin } = Authentication();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: z.infer<typeof LoginSchema>) => onLogin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login success!");
    },
    onError: () => {
      toast.error("An error occured!");
    },
  });
};

export const useRegister = () => {
  const { onRegister } = Authentication();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: z.infer<typeof RegisterSchema>) =>
      onRegister(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Register success!");
    },
    onError: () => {
      toast.error("An error occured!");
    },
  });
};

export const useLogOut = () => {
  const { onLogOut } = Authentication();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: onLogOut,
    onSuccess: () => {
      toast.success("LogOut success!");
      queryClient.clear();
    },
    onError: () => {
      toast.error("An error occured!");
    },
  });
};

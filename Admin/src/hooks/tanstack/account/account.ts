import {
  AccountType,
  createAccount,
  deleteAccount,
  editAccount,
  showAccount,
} from "@/services/api/account/account";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { form: FormData }) => createAccount(payload.form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      toast.success("Account created successfully!");
    },
    onError: () => {
      toast.error("An error occured!");
    },
  });
};

export const useShowAccount = () => {
  return useQuery<AccountType>({
    queryKey: ["account"],
    queryFn: showAccount,
  });
};

export const useDestroyAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string }) => deleteAccount(payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      toast.success("Account deleted successfully");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
};

export const useEditAccount = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (payload: { form: FormData; id: string }) =>
      editAccount(payload.form, payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      toast.success("Account edited successfully");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
};

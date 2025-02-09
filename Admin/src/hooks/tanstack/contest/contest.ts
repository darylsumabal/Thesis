import {
  addParticipants,
  addTeamParticipants,
  Contest,
  destroyContest,
  getContest,
} from "@/services/api/contest/contest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetContest = () => {
  return useQuery<Contest[]>({
    queryKey: ["contest"],
    queryFn: getContest,
  });
};

export const useAddParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { data: FormData; id: string }) =>
      addParticipants(payload.data, payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant"] });
      toast.success("Participant Added");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
};

export const useAddTeamParticipants = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { data: FormData; id: string }) =>
      addTeamParticipants(payload.data, payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant"] });
      toast.success("Team Participant Added");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
};

export const useDestroyContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string }) => destroyContest(payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contest"] });
      toast.success("Contest Deleted");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
};

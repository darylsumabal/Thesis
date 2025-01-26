import {
  addContest,
  addEvent,
  deleteEvent,
  Events,
  getEvent,
} from "@/services/api/event/event";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { data: FormData }) => addEvent(payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });

      toast.success("Event Created");
    },
    onError: () => {
      toast.error("An error occured");
    },
  });
};

export const useGetEvent = () => {
  return useQuery<Events[]>({
    queryKey: ["event"],
    // refetchInterval: 1000,
    queryFn: getEvent,
  });
};

export const useDestroyEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string }) => deleteEvent(payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      toast.success("Event deleted successfully");
    },
    onError: () => {
      toast.error("An error occured");
    },
  });
};

export const useAddContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { form: FormData; id: string }) =>
      addContest(payload.form, payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      toast.success("Contest added successfully");
    },
    onError: () => {
      toast.error("An error occured");
    },
  });
};

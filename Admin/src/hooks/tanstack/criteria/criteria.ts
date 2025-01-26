import {
  addScoreJudging,
  Criteria,
  editCriteria,
  getCriteria,
  judgingScore,
  Participants,
  showParticipant,
  showScoreCriteria,
} from "@/services/api/criteria/criteria";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

export const useGetCriteria = (group_id: string) => {
  return useQuery<Criteria[]>({
    queryKey: ["score", group_id],
    queryFn: () => getCriteria(group_id),
  });
};

export const useShowScoreCriteria = () => {
  return useQuery<Criteria[]>({
    queryKey: ["score"],
    queryFn: showScoreCriteria,
  });
};

export const useScoreJudging = (judgeId: number) => {
  return useMutation<AxiosResponse<any>, Error, { criteria: judgingScore }>({
    mutationFn: (payload: { criteria: judgingScore }) =>
      addScoreJudging(payload.criteria, judgeId),
    onSuccess: () => {
      toast.success("successfully!");
    },
  });
};

export const useShowParticipants = (contest_id: number) => {
  return useQuery<Participants[]>({
    queryKey: ["score", contest_id],
    queryFn: () => showParticipant(contest_id),
  });
};

export const useUpdateCriteria = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { evaluation_criteria: string; id: string }) =>
      editCriteria(payload.evaluation_criteria, payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score"] }); 
      toast.success("Criteria Edited successfully");
    },
  });
};

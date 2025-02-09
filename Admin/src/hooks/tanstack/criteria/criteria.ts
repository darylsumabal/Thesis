import {
  addScoreJudging,
  addScoreMultipleJudging,
  CriteriaInfo,
  editCriteria,
  editMultipleBasedCriteria,
  getMultipleBasedCriteria,
  getPointBasedCriteria,
  JudgingScore,
  MultipleRoundCriteria,
  MultipleScore,
  PointBasedCriteria,
  showParticipant,
  showScoreCriteria,
} from "@/services/api/criteria/criteria";
import { Participant } from "@/services/api/result/result";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

export const useGetPointBasedCriteria = (group_id: string) => {
  return useQuery<PointBasedCriteria[]>({
    queryKey: ["score", group_id],
    queryFn: () => getPointBasedCriteria(group_id),
  });
};

export const useGetMultipleRoundCriteria = (group_id: string) => {
  return useQuery<MultipleRoundCriteria[]>({
    queryKey: ["score", group_id],
    queryFn: () => getMultipleBasedCriteria(group_id),
  });
};

export const useShowScoreCriteria = () => {
  return useQuery<CriteriaInfo[]>({
    queryKey: ["score"],
    queryFn: showScoreCriteria,
  });
};

export const useScoreJudging = (judgeId: number) => {
  return useMutation<AxiosResponse<any>, Error, { criteria: JudgingScore }>({
    mutationFn: (payload: { criteria: JudgingScore }) =>
      addScoreJudging(payload.criteria, judgeId),
    onSuccess: () => {
      toast.success("successfully!");
    },
  });
};

export const useAddMultipleJudgingScore = (judgeId: number) => {
  return useMutation<AxiosResponse<any>, Error, { criteria: MultipleScore }>({
    mutationFn: (payload: { criteria: MultipleScore }) =>
      addScoreMultipleJudging(payload.criteria, judgeId),
    onSuccess: () => {
      toast.success("successfully!");
    },
    onError: () => {
      toast.error("An error occurred!");
    },
  });
};


export const useShowParticipants = (contest_id: number) => {
  return useQuery<Participant[]>({
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

export const useUpdateMultipleCriteria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { evaluation_criteria: string; id: number }) =>
      editMultipleBasedCriteria(payload.evaluation_criteria, payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score"] });
      toast.success("Criteria Edited successfully");
    },
  });
};

import {
  createCriteriaMultipleRound,
  createCriteriaPointBased,
  getJudges,
  getScoring,
  JudgesData,
  Scoring,
} from "@/services/api/scoring/scoring";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ScoringDataMultipleRound,
  ScoringDataPointBased,
} from "../../../lib/constant/scoring";

export const useGetScoring = (scoringType: string) => {
  return useQuery<Scoring[]>({
    queryKey: ["scoring", scoringType],
    queryFn: () => getScoring(scoringType),
  });
};

export const useShowJudges = () => {
  return useQuery<JudgesData[]>({
    queryKey: ["scoring"],
    queryFn: getJudges,
  });
};

export const useCreateCriteriaPointBased = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: number; data: ScoringDataPointBased }) =>
      createCriteriaPointBased(payload.id, payload.data),
    onSuccess: () => {
      toast.success("Criteria created successfully");
      queryClient.invalidateQueries({ queryKey: ["scoring"] });
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
};

export const useCreateCriteriaMultipleRound = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: number; data: ScoringDataMultipleRound }) =>
      createCriteriaMultipleRound(payload.id, payload.data),
    onSuccess: () => {
      toast.success("Criteria created successfully");
      queryClient.invalidateQueries({ queryKey: ["scoring"] });
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
};

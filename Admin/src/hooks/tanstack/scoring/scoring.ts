import {
  createCriteria,
  getJudges,
  getScoring,
  JudgesData,
  Scoring,
} from "@/services/api/scoring/scoring";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SCORINGDATA } from "../../../lib/constant/scoring";

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

export const useAddCriteria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paylaod: { id: number; data: SCORINGDATA }) =>
      createCriteria(paylaod.id, paylaod.data),
    onSuccess: () => {
      toast.success("Criteria created successfully");
      queryClient.invalidateQueries({ queryKey: ["scoring"] });
    },
    onError: () => {
      toast.error("An error occured");
    },
  });
};

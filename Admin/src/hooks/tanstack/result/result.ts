import {
  showResult,
  Score,
  showResultMultiple,
} from "@/services/api/result/result";
import { useQuery } from "@tanstack/react-query";

export const useShowResult = (contest_id: number, group_id: string) => {
  return useQuery<Score[]>({
    queryKey: ["result", contest_id, group_id],
    queryFn: () => showResult(contest_id, group_id),
  });
};

export const useShowMultipleResult = (contest_id: number, group_id: string) => {
  return useQuery<Score[]>({
    queryKey: ["result", contest_id, group_id],
    queryFn: () => showResultMultiple(contest_id, group_id),
  });
};

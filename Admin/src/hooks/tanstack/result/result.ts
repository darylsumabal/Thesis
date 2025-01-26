import { showResult, Score } from "@/services/api/result/result";
import { useQuery } from "@tanstack/react-query";

export const useShowResult = (contest_id: number, group_id: string) => {
  return useQuery<Score[]>({
    queryKey: ["result", contest_id, group_id],
    queryFn: () => showResult(contest_id, group_id),
  });
};

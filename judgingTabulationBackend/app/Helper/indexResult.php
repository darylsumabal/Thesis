<?php

use App\Models\Contest\ContestJudges;
use App\Models\Judging\JudgesGroup;
use App\Models\Participant\Participant;
use Illuminate\Support\Facades\DB;

function indexResult($contestId, $groupId, $criteriaModel, $judgingScoreModel, $totalScoreModel, $overAllScoreModel)
{
    $judgesGroup = JudgesGroup::where('contest_id', $contestId)
        ->where('group_id', $groupId)
        ->whereNotExists(function ($query) use ($contestId, $groupId) {
            $query->select(DB::raw(1))
                ->from('judges_groups')
                ->where('contest_id', $contestId)
                ->where('group_id', $groupId)
                ->where('is_finished', 0);
        })
        ->get();

    if ($judgesGroup->isNotEmpty()) {

        $participants = Participant::where('contest_id', $contestId)->get();

        $criteria = $criteriaModel::where('contest_id', $contestId)->where('group_id', $groupId)->get();

        $judgingScores = $judgingScoreModel::where('contest_id', $contestId)->where('group_id', $groupId)->get();

        $judgingContest = ContestJudges::where('contest_id', $contestId)->where('group_id', $groupId)->get();

        $results = [];

        foreach ($participants as $participant) {

            $participantScores = $judgingScores->where('participant_id', $participant->id);

            $evaluationCriteriaTotals = [];

            $criteriaCount = $criteria->count();
            $judgesCount =  $judgingContest->count();

            $maxScore = ($criteriaCount * $judgesCount) * 100;

            foreach ($participantScores as $score) {
                $criterion = $score->evaluationCriterion;
                if (!isset($evaluationCriteriaTotals[$criterion])) {
                    $evaluationCriteriaTotals[$criterion] = 0;
                }
                $evaluationCriteriaTotals[$criterion] += $score->score;
            }


            $totalSum = array_sum($evaluationCriteriaTotals);

            $overallScore = ($totalSum / $maxScore) * 100;

            foreach ($evaluationCriteriaTotals as $criterion => $totalScore) {

                $exists = $totalScoreModel::where('participant_id', $participant->id)
                    ->where('contest_id', $contestId)
                    ->where('group_id', $groupId)
                    ->where('evaluationCriterion', $criterion)
                    ->exists();

                if (!$exists) {
                    $totalScoreModel::create([
                        'participant_id' => $participant->id,
                        'contest_id' => $contestId,
                        'group_id' => $groupId,
                        'evaluationCriterion' => $criterion,
                        'score' => $totalScore,
                    ]);
                }

                $scoreExist = $overAllScoreModel::where('participant_id', $participant->id)->where('contest_id', $contestId)->where('group_id', $groupId)->exists();

                if (!$scoreExist) {
                    $overAllScoreModel::create([
                        'score' => $overallScore,
                        'participant_id' => $participant->id,
                        'group_id' => $groupId,
                        'contest_id' => $contestId,
                    ]);
                }
            }

            $overall = $overAllScoreModel::where('participant_id', $participant->id)
                ->where('contest_id', $contestId)
                ->where('group_id', $groupId)
                ->first();

            $results[] = [
                'participant_id' => $participant->id,
                'participant' => $participant,
                'total_scores' => $evaluationCriteriaTotals,
                'overall_scores' => $overall
            ];
        }

        return response()->json(['results' => $results], 200);
    }
}

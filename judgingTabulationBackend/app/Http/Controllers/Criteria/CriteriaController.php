<?php

namespace App\Http\Controllers\Criteria;

use App\Http\Controllers\Controller;
use App\Models\Criteria\PointBasedCriteria;
use App\Models\Criteria\MultipleBasedCriteria;
use App\Models\Scoring\Scores;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CriteriaController extends Controller
{
    public function indexScoresCriteria(): JsonResponse
    {
        $scores = Scores::with(['contest.event'])->get();

        // $scores = Scores::with(['criteria', 'judges.judge', 'contest.event'])->get();

        return response()->json(['criteria_list' => $scores], 200);
    }

    public function getScoresPointBased($groupId): JsonResponse
    {
        $scores = Scores::with(['criteria', 'judges.judge', 'contest.event'])->where('group_id', $groupId)->get();

        return response()->json(['scores' => $scores], 200);
    }

    public function getScoresMultipleRound($groupId): JsonResponse
    {
        $scores = Scores::with(['criteriaMultipleRound', 'judges.judge', 'contest.event'])->where('group_id', $groupId)->get();


        $scores->each(function ($score) {
            $groupedCriteria = $score->criteriaMultipleRound->groupBy('round')->map(function ($roundData, $round) {
                return [
                    'round' => $round,
                    'criteria' => $roundData->map(function ($criteria) {
                        return [
                            'id' => $criteria->id,
                            'evaluation_criteria' => $criteria->evaluation_criteria,
                            'score' => $criteria->score,
                            'round' => $criteria->round
                        ];
                    })->values()->all()
                ];
            })->values()->all();
            $score->criteriaMultipleRound = $groupedCriteria;
        });

        return response()->json(['scores' => $scores], 200);
    }


    public function update(Request $request, $id)
    {
        $criteria = PointBasedCriteria::findOrFail($id);

        $validate = $request->validate([
            'evaluation_criteria' => 'string|required|min:1'
        ]);

        $criteria->update($validate);

        return response()->json(['message' => 'Criteria edited successfully'], 200);
    }

    public function updateMultiple(Request $request, $id)
    {
        $criteria = MultipleBasedCriteria::findOrFail($id);

        $validate = $request->validate([
            'evaluation_criteria' => 'string|required|min:1'
        ]);

        $criteria->update($validate);

        return response()->json(['message' => 'Criteria edited successfully'], 200);
    }
}

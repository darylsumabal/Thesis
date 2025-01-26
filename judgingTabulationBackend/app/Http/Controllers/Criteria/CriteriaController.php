<?php

namespace App\Http\Controllers\Criteria;

use App\Http\Controllers\Controller;
use App\Models\Criteria;
use App\Models\Scores;
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

    public function getScores($groupId): JsonResponse
    {
        $scores = Scores::with(['criteria', 'judges.judge', 'contest.event'])->where('group_id', $groupId)->get();

        return response()->json(['scores' => $scores], 200);
    }


    public function update(Request $request, $id)
    {
        $criteria = Criteria::findOrFail($id);

        $validate = $request->validate([
            'evaluation_criteria' => 'string|required|min:1'
        ]);

        $criteria->update($validate);

        return response()->json(['message' => 'Criteria edited successfully'], 200);
    }
}

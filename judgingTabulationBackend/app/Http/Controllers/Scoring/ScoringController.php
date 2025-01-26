<?php

namespace App\Http\Controllers\Scoring;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\AddContest;
use App\Models\ContestJudges;
use App\Models\Criteria;
use App\Models\JudgesGroup;
use App\Models\Scores;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScoringController extends Controller
{
    public function index(Request $request): JsonResponse
    {

        $scoringType = $request->query('scoringType');

        $query = AddContest::where('contest_scoring_type', $scoringType)->with('event')->get();

        return response()->json(['contest' => $query], 200);
    }

    public function store(Request $request, $contestId): JsonResponse
    {
        $contest = AddContest::findOrFail($contestId);

        $request->validate([
            'judges' => 'required|array',
            'judges.*' => 'exists:accounts,id',
        ]);

        $groupId = uniqid();

        // $contestJudges = [];

        $judgeId = $request->input('judges');

        $contestJudges = collect($judgeId)->map(function ($judge) use ($groupId, $contest) {
            return [
                'group_id' => $groupId,
                'judge_id' => $judge['id'],
                'contest_id' => $contest->id,
                'created_at' => now(),
                'updated_at' => now()
            ];
        })->toArray();

        $judgesGroup = collect($judgeId)->map(function ($judge) use ($groupId, $contestId) {
            return [
                'contest_id' => $contestId,
                'group_id' => $groupId,
                'judges_id' => $judge['id'],
                'is_finished' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ];
        })->toArray();




        // foreach ($request->input('judges') as $judgeId) {
        //     Account::findOrFail($judgeId);
        //     $contestJudges[] = [
        //         'group_id' => $groupId,
        //         'judge_id' => $judgeId['id'],
        //         'contest_id' => $contest->id,
        //         'created_at' => now(),
        //         'updated_at' => now()
        //     ];
        // }

        // $contestCriteria = [];

        // foreach ($criteria  as $criterion) {
        //     $contestCriteria[] = [
        //         'group_id' => $groupId,
        //         'evaluation_criteria' => $criterion['evaluationCriterion'],
        //         'score' => $criterion['score'],
        //         'contest_id' => $contest->id,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ];
        // }

        $criteria = $request->input('criteria');

        $contestCriteria = collect($criteria)->map(function ($criterion) use ($groupId, $contest) {
            return [
                'group_id' => $groupId,
                'evaluation_criteria' => $criterion['evaluationCriterion'],
                'score' => $criterion['score'],
                'contest_id' => $contest->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        Criteria::insert($contestCriteria);

        ContestJudges::insert($contestJudges);

        JudgesGroup::insert($judgesGroup);

        Scores::create([
            'group_id' => $groupId,
            'contest_id' => $contest->id
        ]);


        return response()->json(['message' => 'Judges added', 'criteria' => $contestCriteria], 201);
    }
}

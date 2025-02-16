<?php

namespace App\Http\Controllers\Scoring;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Contest\AddContest;
use App\Models\Contest\ContestJudges;
use App\Models\Criteria\PointBasedCriteria;
use App\Models\Judging\JudgesGroup;
use App\Models\Criteria\MultipleBasedCriteria;
use App\Models\Scoring\Scores;
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

    public function storePointBased(Request $request, $contestId): JsonResponse
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

        PointBasedCriteria::insert($contestCriteria);

        ContestJudges::insert($contestJudges);

        JudgesGroup::insert($judgesGroup);

        Scores::create([
            'group_id' => $groupId,
            'contest_id' => $contest->id
        ]);


        return response()->json(['message' => 'Judges added', 'criteria' => $contestCriteria], 201);
    }


    public function storeMultipleRound(Request $request, $contestId)
    {

        $contest = AddContest::findOrFail($contestId);

        $request->validate([
            'judges' => 'required|array',
            'judges.*' => 'exists:accounts,id',
        ]);

        $groupId = uniqid();

        $judgeId = $request->input('judges');
  
        $criteria = $request->input('multiple.criteria');


        $contestJudges = collect($judgeId)->map(function ($judge) use ($groupId, $contest) {
            return [
                'group_id' => $groupId,
                'judge_id' =>  $judge['id'],
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


        $contestCriteria = collect($criteria)->map(function ($criterion) use ($groupId, $contest) {
            $round = $criterion['round'];
            return collect($criterion['criterion'])->map(function ($item) use ($groupId, $contest, $round) {
                return [
                    'contest_id' => $contest->id,
                    'group_id' => $groupId,
                    'round' => $round,
                    'evaluation_criteria' => $item['evaluationCriterion'],
                    'score' => $item['score'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });
        })->flatten(1)->toArray();


        MultipleBasedCriteria::insert($contestCriteria);

        ContestJudges::insert($contestJudges);

        JudgesGroup::insert($judgesGroup);

        Scores::create([
            'group_id' => $groupId,
            'contest_id' => $contest->id
        ]);


        return response()->json(['message' => 'added', 'criteria' => $contestCriteria], 201);
    }
}

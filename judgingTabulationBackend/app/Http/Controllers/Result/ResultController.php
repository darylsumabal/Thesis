<?php

namespace App\Http\Controllers\Result;

use App\Http\Controllers\Controller;
use App\Models\JudgesGroup;
use App\Models\JudgingScores;
use App\Models\OverallScore;
use App\Models\Participant;
use App\Models\ResultScores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($contestId, $groupId)
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

            $participants = Participant::all();

            $judgingScores = JudgingScores::where('contest_id', $contestId)->where('group_id', $groupId)->get();


            $results = [];


            foreach ($participants as $participant) {

                $participantScores = $judgingScores->where('participant_id', $participant->id);


                $evaluationCriteriaTotals = [];

                foreach ($participantScores as $score) {
                    $criterion = $score->evaluationCriterion;

                    if (!isset($evaluationCriteriaTotals[$criterion])) {
                        $evaluationCriteriaTotals[$criterion] = 0;
                    }
                    $evaluationCriteriaTotals[$criterion] += $score->score;
                }

                $totalSum = array_sum($evaluationCriteriaTotals);
                $numberOfCriteria = count($evaluationCriteriaTotals);
                $overallScore = $numberOfCriteria > 0 ? $totalSum / $numberOfCriteria : 0;

                foreach ($evaluationCriteriaTotals as $criterion => $totalScore) {

                    $exists = ResultScores::where('participant_id', $participant->id)
                        ->where('contest_id', $contestId)
                        ->where('group_id', $groupId)
                        ->where('evaluationCriterion', $criterion)
                        ->exists();

                    if (!$exists) {
                        ResultScores::create([
                            'participant_id' => $participant->id,
                            'contest_id' => $contestId,
                            'group_id' => $groupId,
                            'evaluationCriterion' => $criterion,
                            'score' => $totalScore,
                        ]);
                    }

                    $scoreExist = OverallScore::where('participant_id', $participant->id)->where('contest_id', $contestId)->where('group_id', $groupId)->exists();

                    if (!$scoreExist) {
                        OverallScore::create([
                            'score' => $overallScore,
                            'participant_id' => $participant->id,
                            'group_id' => $groupId,
                            'contest_id' => $contestId,
                        ]);
                    }
                }

                $overall = OverallScore::where('participant_id', $participant->id)
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

        return response()->json(['message' => 'Wait for the other judges to be done'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

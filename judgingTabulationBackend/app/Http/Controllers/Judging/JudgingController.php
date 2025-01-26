<?php

namespace App\Http\Controllers\Judging;

use App\Http\Controllers\Controller;
use App\Models\ContestJudges;
use App\Models\JudgesGroup;
use App\Models\JudgingScores;
use App\Models\Participant;
use App\Models\Scores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JudgingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($contestId)
    {
        $participants = Participant::where("contest_id", $contestId)->get();

        return response()->json(['participants' => $participants], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $judgeId)
    {

        try {

            JudgesGroup::where('judges_id', $judgeId)->update(['is_finished' => 1]);

            $request->validate([
                'criteria.*.contest_id' => 'required|integer',
                'criteria.*.evaluationCriterion' => 'required|string',
                'criteria.*.group_id' => 'required|string',
                'criteria.*.judges_id' => 'required|integer',
                'criteria.*.participant_id' => 'required|integer',
                'criteria.*.score' => 'required|numeric'
            ]);


            $createdScores = collect($request->input('criteria'))->map(function ($score) {
                $score['created_at'] = now();
                $score['updated_at'] = now();
                return $score;
            })->toArray();

            JudgingScores::insert($createdScores);


            return response()->json(['judging_scores' => $createdScores], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Failed to create judging scores'
            ], 500);
        }
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

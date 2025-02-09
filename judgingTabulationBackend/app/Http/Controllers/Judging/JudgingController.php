<?php

namespace App\Http\Controllers\Judging;

use App\Http\Controllers\Controller;
use App\Models\ContestJudges;
use App\Models\Judging\JudgesGroup;
use App\Models\Judging\JudgingMultipleRound;
use App\Models\Judging\JudgingPointBase;
use App\Models\Judging\PointBased;
use App\Models\Participant\Participant;
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
                'criteria.*.evaluation_criteria' => 'required|string',
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

            JudgingPointBase::insert($createdScores);


            return response()->json(['judging_scores' => $createdScores], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Failed to create judging scores'
            ], 500);
        }
    }


    public function storeMultiple(Request $request, $judgeId)
    {

        try {

            JudgesGroup::where('judges_id', $judgeId)->update(['is_finished' => 1]);

            $request->validate([
                'criteria.*.contest_id' => 'required|integer',
                'criteria.*.round' => 'required|integer',
                'criteria.*.evaluation_criteria' => 'required|string',
                'criteria.*.score' => 'required|numeric',
                'criteria.*.group_id' => 'required|string',
                'criteria.*.judges_id' => 'required|integer',
                'criteria.*.participant_id' => 'required|integer',
            ]);


            $createdScores = collect($request->input('criteria'))->map(function ($score) {
                $score['created_at'] = now();
                $score['updated_at'] = now();
                return $score;
            })->toArray();

            JudgingMultipleRound::insert($createdScores);

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

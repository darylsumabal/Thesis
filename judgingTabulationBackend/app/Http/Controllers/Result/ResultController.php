<?php

namespace App\Http\Controllers\Result;

use App\Http\Controllers\Controller;
use App\Models\Criteria\Criteria;
use App\Models\Criteria\PointBasedCriteria;
use App\Models\Judging\JudgingMultipleRound;
use App\Models\Judging\JudgingPointBase;
use App\Models\Result\OverAllScoreMultiple;
use App\Models\Result\OverallScorePoint;
use App\Models\Result\TotalScoresPointBase;
use App\Models\Criteria\MultipleBasedCriteria;
use App\Models\Result\TotalScoresMultipleRound;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexPointBased($contestId, $groupId)
    {
        return indexResult(
            $contestId,
            $groupId,
            PointBasedCriteria::class,
            JudgingPointBase::class,
            TotalScoresPointBase::class,
            OverallScorePoint::class
        );
    }

    public function indexMultipleBased($contestId, $groupId)
    {
        return indexResult(
            $contestId,
            $groupId,
            MultipleBasedCriteria::class,
            JudgingMultipleRound::class,
            TotalScoresMultipleRound::class,
            OverAllScoreMultiple::class
        );
    }

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

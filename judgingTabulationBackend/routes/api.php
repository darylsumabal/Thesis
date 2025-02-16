<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Contest\ContestController;
use App\Http\Controllers\Criteria\CriteriaController;
use App\Http\Controllers\Event\AddEventController;
use App\Http\Controllers\Event\UpcomingEventController;
use App\Http\Controllers\Judging\JudgingController;
use App\Http\Controllers\Result\ResultController;
use App\Http\Controllers\Scoring\ScoringController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/accounts', [AccountController::class, 'index']);

Route::post('/accounts', [AccountController::class, 'store']);

Route::post('/account/{id}/update', [AccountController::class, 'updateAccount']);

Route::post('/accounts/{id}', [AccountController::class, 'update']);

Route::post('/accounts/{id}', [AccountController::class, 'destroy']);

Route::get('/contest/judges', [ContestController::class, 'indexJudges']);

Route::get('/events', [UpcomingEventController::class, 'index']);

Route::post('/events/{addEvent}', [UpcomingEventController::class, 'destroy']);

Route::post('/events', [AddEventController::class, 'store']);

Route::post('/events/{eventid}/contest', [
    UpcomingEventController::class,
    'store'
]);

Route::get('/contest', [ContestController::class, 'index']);

Route::post('/contest/{contestId}/add-participant', [ContestController::class, 'storeParticipant']);

Route::post('/contest/{contestId}/add-team-participant', [ContestController::class, 'storeTeamParticipant']);

Route::post('/contest/{id}', [ContestController::class, 'destroy']);

// get contest based on scoring type
Route::get('/scoring', [ScoringController::class, 'index']);

Route::post('/contest/{contestId}/create-criteria/point-based', [ScoringController::class, 'storePointBased']);

Route::post('/contest/{contestId}/create-criteria/multiple-round', [ScoringController::class, 'storeMultipleRound']);


Route::get('contest/criteria-list/scores', [CriteriaController::class, 'indexScoresCriteria']);

Route::get('contest/{groupId}/scores', [CriteriaController::class, 'getScoresPointBased']);

Route::get('contest/{groupId}/scores/multiple-round', [CriteriaController::class, 'getScoresMultipleRound']);

Route::put('criteria/{id}/edit/multiple-round', [CriteriaController::class, 'updateMultiple']);

Route::get('criteria/contest/{contestId}/judging-score', [JudgingController::class, 'index']);

Route::post('criteria/judge/{judgeId}/judging-scores', [JudgingController::class, 'store']);

Route::post('criteria/judge/{judgeId}/judging-score/multiple-based', [JudgingController::class, 'storeMultiple']);

Route::get('result/contest/{contestId}/{groupId}', [ResultController::class, 'indexPointBased']);

Route::get('result/contest/multiple/{contestId}/{groupId}', [ResultController::class, 'indexMultipleBased']);

Route::put('criteria/{id}/edit', [CriteriaController::class, 'update']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Route::get('/me', [AuthController::class, 'me']);
Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);

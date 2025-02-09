<?php

namespace App\Http\Controllers\Contest;

use App\Models\Account\Account;
use App\Models\Contest\AddContest;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contest\ParticipantRequest;
use App\Http\Requests\Contest\TeamParticipantRequest;
use App\Models\Participant\Participant;
use App\Models\Participant\TeamParticipant;

class ContestController extends Controller
{
    public function index()
    {
        $contest = AddContest::with('event')->get();
        return response()->json(['contest' => $contest], 200);
    }


    public function indexJudges()
    {
        $judges = Account::where('accountType', 'JUDGE')->get();

        return response()->json(['judges' => $judges], 200);
    }



    public function storeParticipant(ParticipantRequest $request, $contestId)
    {

        $contest = AddContest::findOrFail($contestId);

        $validate = $request->validated();

        $poster = $request->file('poster_url');
        $posterName = uniqid() . '-' . $poster->getClientOriginalName();
        $posterPath = 'poster/' . $posterName;

        $poster->storeAs('poster', $posterName, 'public');

        $participant = Participant::create([
            'first_name' => $validate['first_name'],
            'last_name' => $validate['last_name'],
            'description' => $validate['description'],
            'age' => $validate['age'],
            'gender' => $validate['gender'],
            'poster_url' => $posterPath,
            'contest_id' => $contest->id
        ]);

        return response()->json(['message' => 'Participant added', 'participant' => $participant], 201);
    }

    public function storeTeamParticipant(TeamParticipantRequest $request, $contestId)
    {
        $contest = AddContest::findOrFail($contestId);

        $validate = $request->validated();

        $poster = $request->file('poster_url');
        $posterName = uniqid() . '-' . $poster->getClientOriginalName();
        $posterPath = 'poster/' . $posterName;

        $poster->storeAs('poster', $posterName, 'public');

        $participant = TeamParticipant::create([
            'team_name' => $validate['team_name'],
            'team_description' => $validate['team_description'],
            'team_captain' => $validate['team_captain'],
            'poster_url' => $posterPath,
            'contest_id' => $contest->id
        ]);

        return response()->json(['message' => 'Team Participant added', 'participant' => $participant], 201);
    }


    public function destroy(string $id)
    {

        $contest = AddContest::findOrFail($id);
        $contest->delete();
        return response()->json(['message' => 'Contest deleted successfully'], 200);
    }
}

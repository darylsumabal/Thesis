<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\UpcomingEventRequest;
use App\Models\AddContest;
use App\Models\AddEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UpcomingEventController extends Controller
{
    //display upcoming event
    public function index()
    {

        $event = AddEvent::all();

        return response()->json(['events' => $event]);
    }


    //store contest 
    public function store(UpcomingEventRequest $request, $eventId)
    {

        $event = AddEvent::findOrFail($eventId);

        $validated = $request->validated();

        $poster = $request->file('contest_poster');
        $posterName = uniqid() . '-' . $poster->getClientOriginalName();
        $posterPath = 'poster/' . $posterName;

        $poster->storeAs('poster', $posterName, 'public');

        $contest = AddContest::create([
            'contest_name' => $validated['contest_name'],
            'contest_description' => $validated['contest_description'],
            'contest_scoring_type' => $validated['contest_scoring_type'],
            'contest_venue' => $validated['contest_venue'],
            'contest_poster' => $posterPath,
            'event_id' => $event->id
        ]);

        return response()->json(['message' => 'Contest created', 'contest' => $contest, 201]);
    }


    //destroy event or delete
    public function destroy(AddEvent $addEvent)
    {

        $imagePath = $addEvent->poster;

        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        $addEvent->delete();

        return response()->json(['message' => 'Event deleted']);
    }
}

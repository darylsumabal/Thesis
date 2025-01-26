<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\AddEventRequest;
use App\Models\AddEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AddEventController extends Controller
{

    public function store(AddEventRequest $request)
    {

        $validate = $request->validated();

        $poster = $request->file('poster');
        $posterName = uniqid() . '-' . $poster->getClientOriginalName();
        $posterPath = 'poster/' . $posterName;

        $poster->storeAs('poster', $posterName, 'public');
        // $poster['poster'] = $posterPath;

        $event = AddEvent::create([
            'name' => $validate['name'],
            'description' => $validate['description'],
            'date' => $validate['date'],
            'organizer' => $validate['organizer'],
            'venue' => $validate['venue'],
            'poster' => $posterPath
        ]);

        return response()->json(['message' => 'Event added successfully', 'event' => $event, 201]);
    }
}

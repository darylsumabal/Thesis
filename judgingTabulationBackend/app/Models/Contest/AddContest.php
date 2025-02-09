<?php

namespace App\Models\Contest;

use App\Models\Criteria\Criteria;
use App\Models\Event\AddEvent;

use App\Models\Participant\Participant;
use App\Models\Participant\TeamParticipant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AddContest extends Model
{
    protected $fillable = [
        'contest_name',
        'contest_description',
        'contest_scoring_type',
        'contest_venue',
        'contest_poster',
        'event_id'
    ];


    /**
     * Define a relationship where a contest belongs to an event.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(AddEvent::class, 'event_id');
    }

    public function participants(): HasMany
    {
        return $this->hasMany(Participant::class, 'contest_id');
    }

    public function teamParticipants(): HasMany
    {
        return $this->hasMany(TeamParticipant::class, 'contest_id');
    }

    public function criteria(): HasMany
    {
        return $this->hasMany(Criteria::class, 'contest_id');
    }

    public function contest(): HasMany
    {
        return $this->hasMany(ContestJudges::class, 'contest_id');
    }

    // public function scores(): HasMany
    // {
    //     return $this->hasMany(Scores::class, 'contest_id');
    // }
}

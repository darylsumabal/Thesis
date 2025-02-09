<?php

namespace App\Models\Participant;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TeamParticipant extends Model
{

    protected $fillable = [
        'team_name',
        'team_description',
        'team_captain',
        'poster_url',
        'contest_id'
    ];

  
}

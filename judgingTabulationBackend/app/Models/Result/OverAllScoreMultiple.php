<?php

namespace App\Models\Result;

use Illuminate\Database\Eloquent\Model;

class OverAllScoreMultiple extends Model
{
    protected $fillable = [
        'score',
        'participant_id',
        'contest_id',
        'group_id'
    ];
}

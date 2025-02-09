<?php

namespace App\Models\Judging;

use Illuminate\Database\Eloquent\Model;

class JudgingMultipleRound extends Model
{
    protected $fillable = [
        'contest_id',
        'round',
        'evaluation_criteria',
        'score',
        'group_id',
        'judges_id',
        'participant_id',
    ];
}

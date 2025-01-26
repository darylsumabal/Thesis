<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JudgingScores extends Model
{
    protected $fillable = [
        'contest_id',
        'evaluationCriterion',
        'group_id',
        'judges_id',
        'participant_id',
        'score',
    ];
}

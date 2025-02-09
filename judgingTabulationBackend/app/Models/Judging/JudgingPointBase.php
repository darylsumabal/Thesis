<?php

namespace App\Models\Judging;

use Illuminate\Database\Eloquent\Model;

class JudgingPointBase extends Model
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

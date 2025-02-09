<?php

namespace App\Models\Result;

use App\Models\Participant\Participant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResultScores extends Model
{
    //
    protected $fillable = [
        'participant_id',
        'contest_id',
        'group_id',
        'evaluationCriterion',
        'score',
    ];

    public function participants(): BelongsTo
    {
        return $this->belongsTo(Participant::class,);
    }

    // public function participant():BelongsTo
    // {
    //     return $this->belongsTo(Participant::class, 'participant_id');
    // }
}

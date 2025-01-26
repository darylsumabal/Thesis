<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'description',
        'age',
        'gender',
        'poster_url',
        'contest_id'
    ];

    public function contest(): BelongsTo
    {
        return $this->belongsTo(AddContest::class, 'contest_id');
    }

    // public function resultScores():HasMany
    // {
    //     return $this->hasMany(ResultScores::class, 'participant_id');
    // }
}

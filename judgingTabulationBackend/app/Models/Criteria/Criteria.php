<?php

namespace App\Models\Criteria;

use App\Models\Contest\AddContest;
use App\Models\Scoring\Scores;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Criteria extends Model
{
    protected  $fillable = [
        'group_id',
        'evaluation_criteria',
        'score',
        'contest_id',
    ];

    public function contest(): BelongsTo
    {
        return $this->belongsTo(AddContest::class, 'contest_id');
    }

    public function scores(): HasMany
    {
        return $this->hasMany(Scores::class, 'group_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Criteria extends Model
{
    protected  $fillable = [
        'group_id',
        // 'evualation_criteria',
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

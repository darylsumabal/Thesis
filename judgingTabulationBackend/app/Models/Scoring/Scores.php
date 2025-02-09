<?php

namespace App\Models\Scoring;

use App\Models\Contest\AddContest;
use App\Models\Contest\ContestJudges;
use App\Models\Criteria\Criteria;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Scores extends Model
{
    protected $fillable = [
        "group_id",
        'contest_id'
    ];

    public function criteria(): HasMany
    {
        return $this->hasMany(Criteria::class, 'group_id', 'group_id');
    }

    public function criteriaMultipleRound(): HasMany
    {
        return $this->hasMany(MultipleBasedCriteria::class, 'group_id','group_id');
    }

    public function judges(): HasMany
    {
        return $this->hasMany(ContestJudges::class, 'group_id', 'group_id');
    }


    public function contest(): BelongsTo
    {
        return $this->belongsTo(AddContest::class, 'contest_id', 'id');
    }
}

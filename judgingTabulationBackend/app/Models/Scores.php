<?php

namespace App\Models;

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


    public function judges(): HasMany
    {
        return $this->hasMany(ContestJudges::class, 'group_id', 'group_id');
    }


    public function contest(): BelongsTo
    {
        return $this->belongsTo(AddContest::class, 'contest_id', 'id');
    }


  


    // public function criteria(): BelongsTo
    // {
    //     return $this->belongsTo(Criteria::class, 'group_id', 'group_id');
    // }


    // public function judge(): BelongsTo
    // {
    //     return $this->belongsTo(ContestJudges::class, 'group_id', 'group_id');
    // }
}

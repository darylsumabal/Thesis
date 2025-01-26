<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContestJudges extends Model
{
    protected $fillable = [
        'group_id',
        'judge_id',
        'contest_id',
    ];

    // public function judges(): BelongsTo
    // {
    //     return $this->belongsTo(Account::class, 'judge_id');
    // }

    public function judge(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'judge_id');
    }
    public function contest(): BelongsTo
    {
        return $this->belongsTo(AddContest::class, 'contest_id');
    }

    public function scores(): HasMany
    {
        return $this->hasMany(Scores::class, 'group_id');
    }
}

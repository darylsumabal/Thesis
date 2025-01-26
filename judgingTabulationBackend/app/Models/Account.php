<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'accountType',
        'password'
    ];

    public function judges(): HasMany
    {
        return $this->hasMany(
            ContestJudges::class,
            'judge_id'
        );
    }

 
}

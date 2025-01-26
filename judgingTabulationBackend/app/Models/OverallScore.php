<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OverallScore extends Model
{
    //
    protected $fillable = [
        'score',
        'participant_id',
        'contest_id',
        'group_id',
    ];
}
